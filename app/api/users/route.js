/**
 * This api route is used to get all users
 */

import { connectToDB } from "@mongodb"
import User from "@models/User";

export const GET = async (req, res) => {
    try{
        // Connect to the database and get all users
        await connectToDB();
        const allUsers = await User.find();

        // Return the response and success status
        return new Response(JSON.stringify(allUsers), { status: 200 });
    }
    catch(err){
        // Log the error and return an appropriate response
        console.log(err);
        return new Response(JSON.stringify("Internal Server Error"), { status: 500 });
    }
}