import express from "express";

import { authenticateJWT } from "../utils/jwtAuth.js";
import { createAdmin } from "../controllers/Admin/createAdmin.js";
import { adminLogin } from "../controllers/Admin/adminLogin.js";
import { createGround } from "../controllers/Admin/createGround.js";
import { updateGround } from "../controllers/Admin/updateGround.js";
import { getAllGrounds } from "../controllers/Admin/getAllGrounds.js";
import { fetchGroundById } from "../controllers/Admin/fetchGroundById.js";
import { deleteGround } from "../controllers/Admin/deleteGround.js";
import { getBookings } from "../controllers/Admin/getBookings.js";


const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/create-ground', authenticateJWT, createGround);
router.put('/update-ground/:id', authenticateJWT, updateGround);
router.get('/fetch-grounds', authenticateJWT, getAllGrounds);
router.get('/fetch-ground/:id', authenticateJWT, fetchGroundById);
router.delete('/delete-ground/:id', authenticateJWT, deleteGround);
router.get('/bookings', authenticateJWT, getBookings);

export default router;