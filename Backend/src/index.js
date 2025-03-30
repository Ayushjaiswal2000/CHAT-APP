import express from "express";
import authRoutes from "./Routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./Routes/message.route.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Increase the limit for JSON bodies
app.use(bodyParser.json({ limit: "50mb" })); // Set the limit as required
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

dotenv.config();
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port" + port);
  connectDB();
});
// fbdD4Xe1bcp2PHpe
