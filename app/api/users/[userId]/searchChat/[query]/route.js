/**
 * API: Get chat by search query
 */

import User from "@models/User";
import Chat from "@models/Chat";
import Message from "@models/Message";
import { connectToDB } from "@mongodb";

// Get method to fetch chat details already created
export const GET = async (req, { params }) => {
    try {
        // Connect to the database and get the chat details
        await connectToDB();
        const { userId, query } = params;
        const searchChats = await Chat.find({
            members: userId,
            name: { $regex: query, $options: 'i' }
        }).populate({ path:'members', model: User})
        .populate({
            path: "messages",
            model: Message,
            populate: {
                path: "seenBy sender",
                model: User,
            }
        })
        .exec();

        // Return the chat details and success status
        return new Response(JSON.stringify(searchChats), { status: 200 });
    } 
    catch (error) {
        // Log the error and return an appropriate response
        console.log(error);
        return new Response("Error: Failed to get chat", { status: 500 }); 
    }
}