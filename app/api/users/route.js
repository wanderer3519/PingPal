import { connectToDB } from "@mongodb"
import User from "@models/User";

export const GET = async (req, res) => {
    try{
        await connectToDB();
        const allUsers = await User.find();

        return new Response(JSON.stringify(allUsers), { status: 200 });
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify("Internal Server Error"), { status: 500 });
    }
}