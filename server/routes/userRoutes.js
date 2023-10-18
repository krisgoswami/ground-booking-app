import express from "express";
import { bookTimeSlot, getGroundById, getGrounds, userLogin, userSignup } from "../controllers/userController.js";
import { authenticateJWT } from "../utils/jwtAuth.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/grounds', getGrounds);
router.get('/ground/:id', authenticateJWT, getGroundById);
router.post('/book-slot', authenticateJWT, bookTimeSlot);


export default router;