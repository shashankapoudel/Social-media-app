import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        const token = req.header("Authorization")?.replace("Bearer", "").trim();
        console.log(token);

        if (!token) return res.status(401).json({ message: "Unauthorized:No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err);
            } else {
                return decoded
            }
        });

        console.log("Decoded payload:", decoded._id);

        const user = await User.findById(decoded._id.toString()).select("-password");

        req.user = user;

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

export default protectRoute;


