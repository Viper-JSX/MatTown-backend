import { Router } from "express";
import CommunityController from "../controllers/CommunityController.js";
import verifyToken from "../middleware/verifyToken.js";

const CommunityRouter = new Router();

CommunityRouter
.post("/create", verifyToken, CommunityController.create)
.post("/:id/edit", verifyToken, CommunityController.edit)
.post("/:id/delete", verifyToken, CommunityController.delete)
.post("/:id/add-member", verifyToken, CommunityController.addMember)
.post("/:id/remove-member", verifyToken, CommunityController.removeMember)
.post("/:id/create-post", verifyToken, CommunityController.createPost)

export default CommunityRouter;