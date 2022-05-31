import PostMessage from "../models/postMessage.js";
import User from "../models/user.js"
import mongoose from 'mongoose';

export const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await PostMessage.find({ creator: id });
        const user = await User.find({ _id: id });
        if (!user) {
            //Handle invalid user
        }
        const profile = {
            username: user[0].name,
            followers: user[0].followers,
            following: user[0].following,
            posts: posts
        }
        res.json({ data: profile });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}