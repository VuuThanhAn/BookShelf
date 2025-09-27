import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound"; // 👈 import thêm

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded shadow">
  {/* Bên trái: Trang chủ */}
  <div>
    <Link
      to="/"
      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
    >
      🏠 Trang chủ
    </Link>
  </div>

  {/* Bên phải: Các nút khác */}
  <nav className="flex gap-3">
    
    <Link
      to="/stats"
      className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
    >
      📊 Thống kê
    </Link>
  </nav>
</header>

      {/* Nội dung */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit/:id" element={<AddEdit />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} /> {/* 👈 thêm route 404 */}
        </Routes>
      </main>
    </div>
  );
}
