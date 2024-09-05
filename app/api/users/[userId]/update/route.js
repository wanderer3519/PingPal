/**
 * This api route is used to update the user details
 */

import User from "@models/User";
import { connectToDB } from "@mongodb"

// Post method to update the user details
export const POST = async (req, { params }) => {
    try {
        // connect to the database and get the body of the request
        await connectToDB();

        const { userId } = params;
        const body = await req.json();

        const { username, profileImage } = body;

        // Update the user details
        const updatedUser = await User.findByIdAndUpdate(
            userId, {
            username,
            profileImage,
            },
            { new: true }
        
        );

        // Return the response and success
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch(err) {
        // Log the error and return an appropriate response
        console.log(err);
        return new Response("Failed to update user", { status: 500 });
    }

}