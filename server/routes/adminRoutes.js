import express from "express";
import { adminLogin, createAdmin, createGround, fetchGroundById, getAllGrounds } from "../controllers/adminController.js";
import { authenticateJWT } from "../utils/jwtAuth.js";
import { upload } from "../utils/imgUpload.js";


const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/create-ground', authenticateJWT, upload.array('images', 5), createGround);
router.get('/fetch-grounds', authenticateJWT, getAllGrounds);
router.get('/fetch-ground/:id', authenticateJWT, fetchGroundById);

export default router;