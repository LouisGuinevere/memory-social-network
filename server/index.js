import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js"
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: "true"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}))
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.get("/", (req, res) => {
    res.send("App is running");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
.catch((error) => console.log(error.message));