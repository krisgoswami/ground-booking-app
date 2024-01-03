import { User } from "../../models/userModel";

//*************** get bookings by user ***************//
export const getBookings = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate('bookings');
        if (user) {
            res.status(200).send({
                bookings: user.bookings || [],
                success: true,
            });
        } else {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No bookings found",
            success: false,
            error,
        });
    }
}