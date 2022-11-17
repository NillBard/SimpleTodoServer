import { Router } from "express";
import todoRouter from "./todoRouter";
import authRouter from "./todoRouter";

const router = new Router();

router.use("/auth", authRouter);
router.use("/todos", todoRouter);

export default router;
