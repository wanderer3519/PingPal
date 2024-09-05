/**
 * This model represents a user in the database.
 */

import mongoose from "mongoose";

// Designing a schema for the user
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
        default: '',
    },
    chats: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        }],
        default: [],
    }
});

// If there is an existing user model, use it. Otherwise, create a new one
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;