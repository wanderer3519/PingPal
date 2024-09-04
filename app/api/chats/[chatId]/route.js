import { connectToDB } from "@mongodb";
import Chat from "@models/Chat";
import User from "@models/User";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const chat = await Chat.findById(params.chatId).populate({
            path: "members",
            model: User,
        }).exec();

        return new Response(JSON.stringify(chat), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal server error: failed to fetch chat details", { status: 500 });
    }
}