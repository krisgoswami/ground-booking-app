import express from "express";

import { authenticateJWT } from "../utils/jwtAuth.js";
import { userSignup } from "../controllers/User/userSignup.js";
import { userLogin } from "../controllers/User/userLogin.js";
import { getGrounds } from "../controllers/User/getGrounds.js";
import { getGroundById } from "../controllers/User/getGroundById.js";
import { bookTimeSlot } from "../controllers/User/bookTimeSlot.js";
import { getBookings } from "../controllers/Admin/getBookings.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/grounds', getGrounds);
router.get('/ground/:id', getGroundById);
router.post('/book-slot/:id', authenticateJWT, bookTimeSlot);
router.get('/bookings', authenticateJWT, getBookings);

export default router;