import { Admin } from "../models/adminModel";
import jwt from "jsonwebtoken";

//***** admin registration *****//

export const createAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //validation for existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({
                message: 'Admin already exists',
                success: false,
            });
        }

        //saving admin to db
        const admin = new Admin({
            username: username,
            email: email,
            password: password,
        });
        await admin.save();

        const token = jwt.sign({ email, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' }); //created this token so that user can login upon signing up
        return res.status(200).send({
            message: "Admin created",
            success: true,
            admin,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error registering admin",
            success: false,
            error,
        });
    }
}