import { Router } from "express";
import AuthController from "../Controller/userController";

const authController = new AuthController();
const router = new Router();

router.post("/login", authController.login.bind(authController));
router.post("/signup", authController.register.bind(authController));

export default router;
