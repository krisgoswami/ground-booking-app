import { User } from "../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//*************** user login ***************//
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }

        //compare password
        const matchPassword = bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(403).send({
                message: "Incorrect email or password",
                success: false,
            });
        }

        //create token and login
        const token = jwt.sign(
            { email, role: 'user' },
            process.env.SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).send({
            message: "Logged in",
            success: true,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something went wrong",
            success: false,
            error,
        });
    }
}