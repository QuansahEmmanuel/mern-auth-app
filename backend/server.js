import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);

// dbConnection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
