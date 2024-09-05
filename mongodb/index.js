/**
 * This file is responsible for connecting to the database  
 */

import mongoose from "mongoose";


// Check if db is connected
let isConnected = false;

// Connect to data base
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // If already connected, do nothing
    if (isConnected) {
        console.log("=> using existing database connection");
        return;
    }

    // Connect to new database, otherwise. Using a try catch to minimize errors
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "HaloChat",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("=> using new database connection");
    } catch (error) {
        console.log("=> error connecting to database:", error);
    }
};