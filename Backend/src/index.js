import express from "express";
import authRoutes from "./Routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config();
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port" + port);
  connectDB();
});
// fbdD4Xe1bcp2PHpe
