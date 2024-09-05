/**
 * This api route is used to create a new chat
 */

import { connectToDB } from "@mongodb";
import Chat from "@models/Chat";
import User from "@models/User";
import { pusherServer } from "@lib/pusher";

export const POST = async (req) => {
    try {
        // connect to database and get the body of the request
        await connectToDB();
        const body = await req.json();
        const { currentUserId, members, isGroup, name, groupPhoto } = body;

        // Define query to find chat
        const query = isGroup ? { isGroup, name, groupPhoto, members: [currentUserId, ...members]} 
        : { members: { $all: [currentUserId, ...members], $size: 2 } };
        
        // Find chat
        const chat = await Chat.findOne(query);
        
        // If chat does not exist, create a new chat
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

            // Trigger pusher events for each member to notify each member in real time 
            chat.members.map((member) => {
                pusherServer.trigger(member._id.toString(), "new-chat", chat);
            })
        }

        // Return the chat response
        return new Response(JSON.stringify(chat), { status: 200 });
    } 
    
    catch (err) {
        // Log the error and return an appropriate response
        console.log(err);
        return new Response("Error: Failed to create new chat", { status: 500 });
    }
}