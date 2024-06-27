import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import bcrypt from 'bcryptjs'
import { useParams } from "react-router-dom"
import { v2 as cloudinary } from "cloudinary"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        console.log(user);
        const accessToken = user.generateAccessToken()


        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        console.log(accessToken);

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }

}


const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body
    console.log(email);

    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
        throw new ApiError(409, "User with email or username already exixts")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        name, email, username,
        password: hashedPassword
    })
    const createdUser = await User.findById(newUser._id).select(
        "-password"
    )
    if (!createdUser) {
        throw ApiError(500, "Something Went Wrong while registring the user")
    }
    if (newUser) {

        return res.status(200).json(new ApiResponse(200, newUser, "Success",))
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username && !password) {
        throw new ApiError(400, "username and email is required")
    }

    const user = await User.findOne({ $or: [{ username }, { password }] });
    if (!user) {
        throw new ApiError(400, "User is not found")
    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        }, "User logged In Successfully")
    )
})


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, {
        $unset: {
            refreshToken: 1
        }
    }, {
        new: true
    }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, {}, "User logged Out")
    )
})


const followunfollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userToModify = await User.findById(id)
    const currentUser = await User.findById(req.user._id);
    console.log(userToModify);

    if (id === req.user._id.toString()) {
        throw new ApiError(400, 'You cannot follow/unfollow yourself ')
    }
    if (!userToModify && !currentUser) {
        throw new ApiError(400, 'No user found')


    }
    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
        //unfollow user
        //modify current user followinf and userToModify ko followers list
        await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
        await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
        return res.status(201).json(
            new ApiResponse(200, "User unfollowed successfully"
            )
        )

    } else {
        await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
        await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
        return res.status(201).json(
            new ApiResponse(200, "User followed successfully"
            )
        )
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const { name, username, email, password, bio } = req.body; // Destructure profilePic here
    let { profilePic } = req.body
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
    }

    if (profilePic) {
        if (user.profilePic) {
            await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        user.profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;

    // const newUser = new user({ name, username, email, password, bio, profilePic });
    const newUser = await user.save();
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res.status(201).json(
        new ApiResponse(200, { user: newUser, accessToken }, "User updated successfully")
    );
});


const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username }).select("-password -updateAt")
    if (!user) {
        throw new ApiError(400, 'No user with such username found')
    }
    return res.status(200).json(
        new ApiResponse(200, user, "User Profile found")
    )

})




export { signupUser, loginUser, logoutUser, followunfollowUser, updateUser, getUserProfile };