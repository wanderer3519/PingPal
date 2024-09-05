import { connectToDB } from "@mongodb";
import Chat from "@models/Chat";
import User from "@models/User";
import { pusherServer } from "@lib/pusher";

export const POST = async (req) => {
    try {
        await connectToDB();
        const body = await req.json();
        const { currentUserId, members, isGroup, name, groupPhoto } = body;

        // Define qury to find chat
        const query = isGroup ? { isGroup, name, groupPhoto, members: [currentUserId, ...members]} 
        : { members: { $all: [currentUserId, ...members], $size: 2 } };
        

        let chat = await Chat.findOne(query);
        
        if(!chat){
            chat = await new Chat(
                isGroup? query : { members: [currentUserId, ...members] }
            );
            await chat.save();
            const updateAllMembers = chat.members.map(async (memberId) => {
                await User.findByIdAndUpdate(
                    memberId, 
                    { $addToSet: { chats: chat._id } },
                    { new: true }
                )
            })
            await Promise.all(updateAllMembers); 

            chat.members.map((member) => {
                pusherServer.trigger(member._id.toString(), "new-chat", chat);
            })
        }
        
        /* Trigger pusher events for each member to notify each member */

        

        console.log("New chat created: ", chat);
        return new Response(JSON.stringify(chat), { status: 200 });
    } 
    
    catch (err) {
        console.log(err);
        return new Response("Error: Failed to create new chat", { status: 500 });
    }
}