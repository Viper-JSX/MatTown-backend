import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import verifyToken from "../middleware/verifyToken.js";

const AuthRouter = new Router();

AuthRouter
.post("/sign-in", AuthController.signIn)
.post("/sign-out", AuthController.signOut)
.post("/sign-up", AuthController.signUp)
.post("/authorize", verifyToken, AuthController.authorize);


export default AuthRouter;