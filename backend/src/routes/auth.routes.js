import { Router } from "express";
import { Login, Logout, singUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", singUp);

router.post("/login", Login);
router.post("/logout", Logout);

export default router;