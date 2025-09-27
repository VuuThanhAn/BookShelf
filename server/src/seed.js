// src/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config();

const sampleBooks = [
  { title: "Atomic Habits", author: "James Clear", category: "Self-help", readAt: "2024-09-10" },
  { title: "Clean Code", author: "Robert C. Martin", category: "Programming", readAt: "2024-08-15" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", readAt: "2024-09-05" },
  { title: "Deep Work", author: "Cal Newport", category: "Self-help", readAt: "2024-09-20" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Novel", readAt: "2024-07-25" }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // Xoá dữ liệu cũ
    await Book.deleteMany({});
    console.log("Old data cleared");

    // Thêm dữ liệu mới
    await Book.insertMany(sampleBooks);
    console.log("Sample books inserted");

    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seedData();
