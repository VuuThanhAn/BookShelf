import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes.js"; 
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares:
app.use(cors({
  origin: process.env.CLIENT_URL,  // FE URL, ví dụ: https://bookshelf-frontend.vercel.app
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes:
app.use("/api/books", bookRoutes);

// 404 default
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  });
