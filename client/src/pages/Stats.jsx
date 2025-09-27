import React, { useEffect, useState } from "react";
import api from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [type, setType] = useState("month");

  const fetchStats = async () => {
    try {
      const res = await api.get(`/books/stats?type=${type}`);
      setStats(res.data);
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [type]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Bộ lọc loại thống kê */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2">📊 Thống kê sách</h2>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="day">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
        {stats && (
          <p className="mt-3">
            ✅ Đã đọc{" "}
            <span className="font-semibold">{stats.totalRead}</span> sách trong{" "}
            {type === "day"
              ? "hôm nay"
              : type === "week"
              ? "tuần này"
              : type === "month"
              ? "tháng này"
              : "năm nay"}
            .
          </p>
        )}
      </div>

      {/* Bảng breakdown */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-3">📋 Chi tiết</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Thời gian</th>
              <th className="p-2">Số sách</th>
            </tr>
          </thead>
          <tbody>
            {stats?.breakdown?.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{row.label}</td>
                <td className="p-2">{row.count}</td>
              </tr>
            ))}
            {(!stats || stats.breakdown.length === 0) && (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-3">📊 Biểu đồ</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats?.breakdown || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
