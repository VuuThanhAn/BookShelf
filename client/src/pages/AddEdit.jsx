import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

export default function AddEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
  });

  useEffect(() => {
    if (id) {
      api.get(`/books/${id}`).then((res) => {
        setForm({
          title: res.data.title || "",
          author: res.data.author || "",
          category: res.data.category || "",
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/books/${id}`, form);
      } else {
        await api.post("/books", form);
      }
      navigate("/");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Lỗi khi lưu sách");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {id ? "✏️ Sửa sách" : "➕ Thêm sách"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Tên sách"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="author"
          placeholder="Tác giả"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="category"
          placeholder="Thể loại"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {id ? "💾 Lưu thay đổi" : "➕ Thêm"}
        </button>
      </form>
    </div>
  );
}
