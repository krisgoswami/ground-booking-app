import { Booking } from "../../models/bookingModel";

//*************** get all bookings ***************//
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).send({
            success: true,
            bookings,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No bookings found",
            success: false,
            error,
        });
    }
}