import { connectToDB } from "@mongodb";
import Chat from "@models/Chat";
import User from "@models/User";
import Message from "@models/Message";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const chat = await Chat.findById(params.chatId).populate({
            path: "members",
            model: User,
        }).populate({
            path: "messages",
            model: Message,
            populate:{
                path: "sender seenBy",
                model: User,
            }
        }) .exec();

        return new Response(JSON.stringify(chat), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal server error: failed to fetch chat details", { status: 500 });
    }
}

export const POST = async (req, { params }) => {
    try {
        await connectToDB();
        const body = await req.json();

        const { chatId } = params;
        const { currentUserId } = body;

        await Message.updateMany(
            { chat: chatId },
            { $addToSet: { seenBy: currentUserId } },
            { new: true }
        ).populate({
            path: "seen seenBy",
            model: User,

        });

        return new Response("Seen all message by current user", { status: 200 });
    } 
    catch (error) {
        console.log(error);
        return new Response("Internal server error: failed to send message", { status: 500 });
    }
}