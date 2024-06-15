import express from 'express'
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js';
import cors from "cors"
import { v2 as cloudinary } from "cloudinary"
// const cors = require('cors')
dotenv.config();
connectDB()
const app = express();

const PORT = process.env.PORT || 5000;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT"],
    credentials: true
}

//middlewares
app.use(express.json({ limit: "150mb" }))
app.use(express.urlencoded({ extended: true }))

// app.use(express.static("public"))

app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


// mongoose.connect(
//     process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//     () => {
//         console.log('Connected to MongoDB');
//     }
// );

app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`));