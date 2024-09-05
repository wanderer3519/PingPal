/**
 * Register a new user
 */

import User from "@models/User";
import { connectToDB } from "@mongodb";
import { hash } from "bcryptjs";

export const POST = async (req, res) => {
    /** All these routes use a try catch statement to avoid errors */
    
    try{
        // Connect to the database
        await connectToDB();

        // Get the body of the request
        const body = await req.json();
        const { username, email, password } = body;
        const existingUser = await User.findOne({ email });

        // Return if the user already exists
        if(existingUser){
            return new Response("User already exists", { status: 400 });
        }

        // Hash the password and create new user
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user
        await newUser.save();

        return new Response(JSON.stringify(newUser), { status: 200 });
    }catch (error) {

        // Log the error and return an appropriate response
        console.log(error);
        return new Response("Internal server error", { status: 500});
    }
}