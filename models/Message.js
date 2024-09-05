/**
 * This model represents a message in the database.
 */

import mongoose from "mongoose";

// Designing a schema for the message
const MessageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        default: ""
    },
    photo:{
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    seenBy: {
        type: [ { type: mongoose.Schema.Types.ObjectId,ref: "User" } ],
        default: [],
    }
})

// If there is an existing message model, use it. Otherwise, create a new one
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;