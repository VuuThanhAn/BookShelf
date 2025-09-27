// src/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes.js"; // route file sẽ tạo sau
import { errorHandler } from "./middleware/errorHandler.js"; // middleware sau

dotenv.config();

const app = express();

// Middlewares:
app.use(cors()); // mặc định cho tất cả origin. Sau này có thể giới hạn origin
app.use(express.json()); // parse application/json
app.use(morgan("dev")); // log requests trong dev

// Routes: (tạm thời nếu file routes chưa có, Node sẽ lỗi; nhưng lưu file này)
app.use("/api/books", bookRoutes);

// 404 default
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI, {
  // các tùy chọn cũ như useNewUrlParser/UnifiedTopology mặc định trong mongoose 6+
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });
