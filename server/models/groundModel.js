import mongoose from "mongoose";
import { bookingModel } from "./bookingModel";

const groundSchema = new mongoose.Schema({
    ground_name: {
        type: String,
        required: [true, "Name is required"],
    },
    location: {
        type: String,
        required: [true, "location is required"],

    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    availableSlots: [String],
    bookings: [bookingModel]
});

export const groundModel = mongoose.model('Ground', groundSchema);