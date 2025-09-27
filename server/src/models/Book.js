import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ["todo", "done"],  // todo = chưa đọc, done = đã đọc
    default: "todo",
  },
  readAt: { type: Date, default: null },   // chỉ có khi status = "done"
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
