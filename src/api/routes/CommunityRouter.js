import { Router } from "express";
import CommunityController from "../controllers/CommunityController.js";
import verifyToken from "../middleware/verifyToken.js";

const CommunityRouter = new Router();

CommunityRouter
.post(("/create"), verifyToken, CommunityController.create);

export default CommunityRouter;