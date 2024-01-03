import { User } from "../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//*************** user registration ***************//
export const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).send({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await user.save(); //save user to db

        const token = jwt.sign(
            { email, role: 'user' },
            process.env.SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).send({
            message: "User created",
            success: true,
            user,
            token,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error creating account",
            success: false,
            error,
        });
    }
}