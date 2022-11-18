import { Router } from "express";
import todoRouter from "./todoRouter.js";
import authRouter from "./userRouter.js";
import favouritesRouter from "./favouritesRouter.js";

const router = new Router();

router.use("/users", authRouter);
router.use("/todos", todoRouter);
router.use("/favourites", favouritesRouter);

export default router;
