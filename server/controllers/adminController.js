import { Admin } from "../models/adminModel.js";
import { Ground } from "../models/groundModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//*************** admin registration ***************//
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

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //saving admin to db
        const admin = new Admin({
            username: username,
            email: email,
            password: hashedPassword,
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
        const token = jwt.sign({ email, role: "admin" }, process.env.SECRET, { expiresIn: '1h' });
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

//*************** ground creation ***************//
export const createGround = async (req, res) => {
    try {
        const images = req.files.map(file => file.path);
        const ground = new Ground({ ...req.body, images });
        await ground.save();
        res.status(200).send({
            message: "Ground creation successful",
            success: true,
            ground,
            groundId: ground.id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "error creating ground",
            success: false,
            error,
        });
    }
}

//*************** get all ground details ***************//
export const getAllGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find({});
        res.status(200).send({
            success: true,
            grounds,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No grounds added",
            success: false,
            error,
        });
    }
}
//*************** fetch ground by id ***************//
export const fetchGroundById = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await Ground.findById(groundId);
        res.status(201).send({
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "ground not found",
            success: false,
            error,
        });
    }
}
//*************** update ground details ***************//