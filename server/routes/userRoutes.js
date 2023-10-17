import express from "express";
import { userSignup } from "../controllers/userController.js";

const router = express.Router();

router.post('/signup', userSignup);

export default router;