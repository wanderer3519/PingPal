import { connectToDB } from "@mongodb";
import Message from "@models/Message";
import Chat from "@models/Chat";
import User from "@models/User";
import { pusherServer } from "@lib/pusher";

export const POST = async (req) => {
    try {
        await connectToDB();

        const body = await req.json();
        const { chatId, currentUserId, text, photo } = body;

        // console.log(body);
        const currentUser = await User.findById(currentUserId);


        const newMessage = await Message.create( {
            chat: chatId,
            sender: currentUser,
            text,
            photo,
            seenBy: currentUserId
        })

        const updatedChat = await Chat.findByIdAndUpdate(
             chatId, 
            { 
                $push: { messages: newMessage._id }, 
                $set: { lastMessageAt: newMessage.createdAt }
            },
            { new: true },
        ).populate({
            path: "messages",
            model: Message,
            populate: {
                path: "sender seenBy",
                model: "User"
            }
        }).populate({
            path: "members",
            model: "User",
        }).exec();
        

        /* 
            Trigger the new-message event on the chatId channel
            and send the new message object as the data payload
        */
        await pusherServer.trigger(chatId, "new-message", newMessage);

        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
        updatedChat.members.forEach(async member => {
            try{
                await pusherServer.trigger(member._id.toString(), "update-chat", {
                    id: chatId,
                    messages: [lastMessage]
                });
            }
            catch(err){
                console.log("Failed to trigger update-chat event");
            }
        });

        return new Response(JSON.stringify(updatedChat), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new message", { status: 500 });
    }
}