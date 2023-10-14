import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ground",
        }
    ],
});

export const User = mongoose.model('User', userSchema);