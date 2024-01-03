import { Admin } from "../../models/adminModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//*************** admin login ***************//
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).send({
                message: "user not found",
                success: false,
            });
        }

        //compare password
        const matchPassword = await bcrypt.compare(password, admin.password);
        if (!matchPassword) {
            return res.status(401).send({
                message: "Incorrect password",
                success: false,
            });
        }

        //create token and login
        const token = jwt.sign({ email, role: "admin" }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).send({
            message: "login successful",
            success: true,
            token,
            admin,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error logging in",
            success: false,
            error,
        });
    }
}