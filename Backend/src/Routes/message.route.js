import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessage,
  sendMessage,
} from "../Controllers/message.controller.js";

const router = express.Router();

// Define the routes

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
