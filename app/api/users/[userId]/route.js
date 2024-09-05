/**
 * This api route is used to get all chats for a user with id: userId
 */

import User from "@models/User";
import Chat from "@models/Chat";
import Message from "@models/Message";
import { connectToDB } from "@mongodb"

// Get method to fetch all chats for a user
export const GET = async (req, { params }) => {
    try {
        // connect to the database and get the userId from the params
        await connectToDB();

        const { userId } = params;

        // Find all chats for the user
        const allChats = await Chat.find({ members: userId })
        .sort({ lastMessageAt: -1 })
        .populate({ 
            path: "members",
            model: User
        })
        .populate({
            path: "messages",
            model: Message,
            populate: {
                path: "seenBy sender",
                model: User,
            }
        })
        .exec();

        // Return the response
        return new Response(JSON.stringify(allChats), { status: 200 });
    } 
    catch (error) {
        // Log the error and return an appropriate response
        console.log(error);
        return new Response("Error: Failed to fetch chats", { status: 500 });
    }
}