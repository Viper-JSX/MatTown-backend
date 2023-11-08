import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = new Router();

UserRouter
.get("/:id", UserController.getUser)
.get("/:id/followers", UserController.getFollowers)

export default UserRouter;