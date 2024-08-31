import User from "@models/User";
import { connectToDB } from "@mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
           
            async authorize(credentials) {
                if(!credentials.email || !credentials.password){
                    throw new Error("Please enter your email and password");
                }

                await connectToDB();

                const user = await User.findOne({ email: credentials.email });

                if(!user || !user?.password){
                    throw new Error("Invalid email or password");
                }

                const isMatch = await compare(credentials.password, user.password);
                if(!isMatch){
                    throw new Error("Invalid password");
                }

                return user;
            },
        }),
    ],
});

export {handler as GET, handler as POST};