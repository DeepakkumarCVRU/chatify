import { Router } from "express";
import { singUp } from "../controllers/auth.controller.js";

const router = Router();

router.get("/loginpage", (req, res) => {
    res.send("Login");
});

router.post("/signup", singUp);

export default router;