import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""

    },
    refreshToken: {
        type: String
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },



}, { timestamps: true })

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            // fullName: this.fullName
            name: this.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
},
    userSchema.methods.generateRefreshToken = function () {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                name: this.name
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
        )
    }



export const User = mongoose.model("User", userSchema)