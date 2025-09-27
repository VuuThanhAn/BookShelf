import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  stats,   // ✅ đổi tên ở đây
} from "../controllers/bookController.js";

const router = express.Router();

// CRUD + filter/pagination
router.post("/", createBook);
router.get("/", getBooks);

// 📊 Thống kê theo ngày/tuần/tháng/năm
// Ví dụ: GET /api/books/stats?type=month
router.get("/stats", stats);

router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
