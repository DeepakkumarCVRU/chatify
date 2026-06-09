import { Router } from "express";
import { Login, Logout, singUp, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", singUp);

router.post("/login", Login);
router.post("/logout", Logout);
router.put("/updat-profile", protectedRoute, updateProfile);
router.get("/check", protectedRoute, (req, res) => res.status(200).json({ message: "User is authenticated", Ok: req.user }));

export default router;