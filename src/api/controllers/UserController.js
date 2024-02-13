import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";

class UserController {
    getUser (req, res) {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid user id");
            return res.status(403).json({ message: "Invalid user id provided" });
        }

        const user = UserModel.findById(userId);
        console.log("getting user", userId)
        res.json({ message: "Getting user", id: req.params.id });
    }

    getFollowers (req, res) {
        res.json({ message: "Getting folllowers", id: req.params.id });
    }

    subscribe (req, res) {
        //console.log("Getting user folllowers", req.params.id);
        res.json({ message: "Subscribing" });
    }
}

export default new UserController