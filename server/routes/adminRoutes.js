import express from "express";
import { adminLogin, createAdmin } from "../controllers/adminController";

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);

export default router;