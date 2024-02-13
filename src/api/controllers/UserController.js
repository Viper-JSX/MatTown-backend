import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";

class UserController {
    async getUser (req, res) {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid user id");
            return res.status(422).json({ message: "Invalid user id provided" });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User with such id does not exist" });
        }

        res.status(200).json({ message: "User successfully received", user });
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