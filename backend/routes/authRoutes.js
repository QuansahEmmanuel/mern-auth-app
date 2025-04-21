import express from "express";
import {
  login,
  logout,
  resgister,
  user,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", resgister);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", protect, user);

export default router;
