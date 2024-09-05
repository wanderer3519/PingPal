/**
 * This api route is used to search for a contact
 */
import User from "@models/User";
import { connectToDB } from "@mongodb"

export const GET = async (req, { params }) => {
    try{
        // connect to the database and get the query from the params
        await connectToDB();

        const {query} = params;

        // Find the contact with respect to the query
        const searchedContacts = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        });

        // Return the response
        return new Response(JSON.stringify(searchedContacts), { status: 200 });
    }
    catch(err) {
        // Log the error and return an appropriate response
        console.log(err);
        return new Response("Error", { status: 500 });
    }
}