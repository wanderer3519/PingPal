/**
 * This file is the route for the chat details page
 * Uses next in built functions to get the id from the path
 */

import { connectToDB } from "@mongodb";
import Chat from "@models/Chat";
import User from "@models/User";
import Message from "@models/Message";

// Get method to fetch chat details already created
export const GET = async (req, { params }) => {
    try {
        // Connect to the database and get the chat details
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

        // Return the chat details and success status
        return new Response(JSON.stringify(chat), { status: 200 });
    } catch (error) {
        // Log the error and return an appropriate response
        console.log(error);
        return new Response("Internal server error: failed to fetch chat details", { status: 500 });
    }
}

// Post method to update the chat details of current chat with id: chatId
export const POST = async (req, { params }) => {
    try {
        // connect to the database and get the body of the request
        await connectToDB();
        const body = await req.json();

        const { chatId } = params;
        const { currentUserId } = body;

        // Update the chat details
        await Message.updateMany(
            { chat: chatId },
            { $addToSet: { seenBy: currentUserId } },
            { new: true }
        ).populate({
            path: "seen seenBy",
            model: User,

        });

        // Return the response
        return new Response("Seen all message by current user", { status: 200 });
    } 
    catch (error) {
        // Log the error and return an appropriate response
        console.log(error);
        return new Response("Internal server error: failed to send message", { status: 500 });
    }
}