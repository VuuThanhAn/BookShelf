import Book from "../models/Book.js";

// 📌 Thêm sách (mặc định chưa đọc)
export const createBook = async (req, res, next) => {
  try {
    const { title, author, category } = req.body;
    if (!title || !author || !category) {
      return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
    }

    const book = await Book.create({
      title,
      author,
      category,
      status: "todo",   // mặc định chưa đọc
      readAt: null,     // chỉ có khi done
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// 📌 Lấy danh sách sách (có filter + phân trang)
export const getBooks = async (req, res, next) => {
  try {
    let { page = 1, limit = 5, category, from, to, q, status } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (from || to) {
      filter.readAt = {};
      if (from) filter.readAt.$gte = new Date(from);
      if (to) filter.readAt.$lte = new Date(to);
    }
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { author: regex }];
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .sort({ createdAt: -1 }) // mới nhất lên đầu
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ data: books, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// 📌 Lấy 1 sách theo id
export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// 📌 Cập nhật sách
export const updateBook = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    // Nếu đánh dấu đã đọc thì tự động set ngày đọc
    if (updateData.status === "done" && !updateData.readAt) {
      updateData.readAt = new Date();
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// 📌 Xoá sách
export const deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ message: "Đã xoá" });
  } catch (err) {
    next(err);
  }
};

// 📌 Thống kê theo ngày/tuần/tháng/năm (có breakdown, dùng giờ VN)
export const stats = async (req, res, next) => {
  try {
    const { type } = req.query;
    const now = new Date();
    let start, end, groupBy, format;

    switch (type) {
      case "day":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        groupBy = {
          $hour: { date: "$readAt", timezone: "Asia/Ho_Chi_Minh" }
        };
        format = (h) => `${h}h`;
        break;

      case "week": {
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        start = new Date(now.getFullYear(), now.getMonth(), diff);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        groupBy = {
          $dayOfWeek: { date: "$readAt", timezone: "Asia/Ho_Chi_Minh" }
        };
        format = (d) => ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d - 1];
        break;
      }

      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        groupBy = {
          $dayOfMonth: { date: "$readAt", timezone: "Asia/Ho_Chi_Minh" }
        };
        format = (d) => `Ngày ${d}`;
        break;

      case "year":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        groupBy = {
          $month: { date: "$readAt", timezone: "Asia/Ho_Chi_Minh" }
        };
        format = (m) => `Tháng ${m}`;
        break;

      default:
        return res.status(400).json({ message: "type phải là day | week | month | year" });
    }

    const agg = await Book.aggregate([
      { $match: { status: "done", readAt: { $gte: start, $lte: end } } },
      { $group: { _id: groupBy, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const breakdown = agg.map((a) => ({
      label: format(a._id),
      count: a.count,
    }));

    res.json({
      type,
      totalRead: breakdown.reduce((t, b) => t + b.count, 0),
      breakdown,
      start,
      end,
    });
  } catch (err) {
    next(err);
  }
};
