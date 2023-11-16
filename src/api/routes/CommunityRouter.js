import { Router } from "express";
import CommunityController from "../controllers/CommunityController.js";
import verifyToken from "../middleware/verifyToken.js";

const CommunityRouter = new Router();

CommunityRouter
.post(("/create"), verifyToken, CommunityController.create)
.post(("/:id/delete"), verifyToken, CommunityController.delete)
.post(("/:id/add-member"), verifyToken, CommunityController.addMember)
.post(("/:id/remove-member"), verifyToken, CommunityController.removeMember)

export default CommunityRouter;