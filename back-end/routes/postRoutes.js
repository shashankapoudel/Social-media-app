import express from "express";
import { createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router()
router.route("/feed").get(protectRoute, getFeedPosts)
router.route("/createpost").post(protectRoute, createPost)

router.route("/:id").get(getPost)
router.route("/user/:username").get(getUserPosts)
router.route("/:id").delete(protectRoute, deletePost)
router.route("/like/:id").post(protectRoute, likeUnlikePost)
router.route("/reply/:id").post(protectRoute, replyToPost)

export default router