import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// auth/login/
router.post("/login", authController.loginUser)

export const authRoute = router;