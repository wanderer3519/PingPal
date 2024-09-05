/**
 * This model represents a chat in the database.
 */

import mongoose from "mongoose";

// Create a schema for the chat
const ChatSchema = new mongoose.Schema({
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        default: [],
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: '',
    },
    groupPhoto: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastMessageAt: {
        type: Date,
        default: Date.now,
    },
});

// If there is an existing chat model, use it. Otherwise, create a new one
const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
export default Chat;