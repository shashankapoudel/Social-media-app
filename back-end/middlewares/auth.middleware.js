import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        console.log(token);
        if (!token) {
            throw new ApiError(401, "unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user
        next()



    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})