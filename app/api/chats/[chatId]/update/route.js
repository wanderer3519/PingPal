/**
 * This file is the route for updating the group chat details
 */

import { connectToDB } from "@mongodb"
import Chat from "@models/Chat";

export const POST = async (req, { params }) => {
    try {
        // connect to the database and get the body of the request
        await connectToDB();
        const body = await req.json();
        const { chatId } = params;
        const { name, groupPhoto } = body;

        // Update the group chat details
        const updatedGroupChat = await Chat.findByIdAndUpdate(
            chatId, 
            { name, groupPhoto },
            { new: true }
        );

        // Return the response and success status
        return new Response(JSON.stringify(updatedGroupChat), { status: 200 });
    } catch (error) {
        // Log the error and return an appropriate response
        console.log(error);
        return new Response("Internal server error: Failed to update group chat", { status: 500 });
    }
}