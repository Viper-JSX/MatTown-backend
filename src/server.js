import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

import AuthRouter from "./api/routes/AuthRouter.js";
import UserRouter from "./api/routes/UserRouter.js";
import PostsRouter from "./api/routes/PostsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/posts", PostsRouter);


export default app;