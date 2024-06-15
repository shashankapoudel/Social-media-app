import express from "express";
import { followunfollowUser, getUserProfile, logoutUser, signupUser, updateUser } from '../controllers/userController.js'
import { loginUser } from '../controllers/userController.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router()

router.route("/profile/:username").get(getUserProfile)
router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
router.route("/logout").post(protectRoute, logoutUser)
router.route("/follow/:id").post(protectRoute, followunfollowUser)
router.route("/update/:id").post(protectRoute, updateUser)
export default router