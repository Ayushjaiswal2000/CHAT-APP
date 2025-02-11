import express from "express";
import authRoutes from "./Routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./Routes/message.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port" + port);
  connectDB();
});
// fbdD4Xe1bcp2PHpe
