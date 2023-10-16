import express from "express";
import { adminLogin, createAdmin, createGround } from "../controllers/adminController.js";

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/create-ground', createGround);

export default router;