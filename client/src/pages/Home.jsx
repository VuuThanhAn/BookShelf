// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/api";

// export default function Home() {
//   const [sachChuaDoc, setSachChuaDoc] = useState([]);
//   const [sachDaDoc, setSachDaDoc] = useState([]);

//   // phân trang riêng
//   const [trangChuaDoc, setTrangChuaDoc] = useState(1);
//   const [tongChuaDoc, setTongChuaDoc] = useState(0);

//   const [trangDaDoc, setTrangDaDoc] = useState(1);
//   const [tongDaDoc, setTongDaDoc] = useState(0);

//   const [gioiHan] = useState(5);

//   // bộ lọc
//   const [theLoai, setTheLoai] = useState("");
//   const [tuKhoa, setTuKhoa] = useState("");
//   const [tuNgay, setTuNgay] = useState("");
//   const [denNgay, setDenNgay] = useState("");

//   // lấy sách chưa đọc
//   const laySachChuaDoc = async () => {
//     try {
//       const params = { page: trangChuaDoc, limit: gioiHan, status: "todo", category: theLoai, q: tuKhoa };
//       const res = await api.get("/books", { params });
//       setSachChuaDoc(res.data.data);
//       setTongChuaDoc(res.data.total);
//     } catch (err) {
//       console.error("Lỗi lấy sách chưa đọc:", err);
//     }
//   };

//   // lấy sách đã đọc
//   const laySachDaDoc = async () => {
//     try {
//       const params = { page: trangDaDoc, limit: gioiHan, status: "done", category: theLoai, q: tuKhoa, from: tuNgay, to: denNgay };
//       const res = await api.get("/books", { params });
//       setSachDaDoc(res.data.data);
//       setTongDaDoc(res.data.total);
//     } catch (err) {
//       console.error("Lỗi lấy sách đã đọc:", err);
//     }
//   };

//   useEffect(() => {
//     laySachChuaDoc();
//   }, [trangChuaDoc, theLoai, tuKhoa]);

//   useEffect(() => {
//     laySachDaDoc();
//   }, [trangDaDoc, theLoai, tuKhoa, tuNgay, denNgay]);

//   const xoaSach = async (id) => {
//     if (!confirm("Bạn có chắc muốn xóa sách này?")) return;
//     await api.delete(`/books/${id}`);
//     laySachChuaDoc();
//     laySachDaDoc();
//   };

//   const danhDauDaDoc = async (id) => {
//     await api.put(`/books/${id}`, { status: "done", readAt: new Date() });
//     laySachChuaDoc();
//     laySachDaDoc();
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="flex gap-6">
//         {/* ====== Danh sách sách (trái) ====== */}
//         <div className="flex-1 space-y-10">
//           {/* 📖 Sách chưa đọc */}
//           <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//             <h2 className="bg-yellow-100 p-4 font-semibold text-lg text-yellow-800">
//               📖 Sách chưa đọc
//             </h2>
//             <table className="w-full text-left text-sm">
//               <thead className="bg-gray-50 text-gray-600 uppercase">
//                 <tr>
//                   <th className="p-3">Tên sách</th>
//                   <th className="p-3">Tác giả</th>
//                   <th className="p-3">Thể loại</th>
//                   <th className="p-3 text-center">Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sachChuaDoc.map((b) => (
//                   <tr key={b._id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{b.title}</td>
//                     <td className="p-3">{b.author}</td>
//                     <td className="p-3">{b.category}</td>
//                     <td className="p-3 text-center space-x-2">
//                       <button
//                         onClick={() => danhDauDaDoc(b._id)}
//                         className="px-3 py-1 rounded-md text-white font-medium 
//                                    bg-gradient-to-r from-green-400 to-green-600 
//                                    hover:from-green-500 hover:to-green-700 
//                                    shadow-md hover:shadow-lg transition"
//                       >
//                         ✅ Đánh dấu đã đọc
//                       </button>
//                       <Link
//                         to={`/edit/${b._id}`}
//                         className="px-3 py-1 rounded-md text-white font-medium 
//                                    bg-gradient-to-r from-blue-400 to-blue-600 
//                                    hover:from-blue-500 hover:to-blue-700 
//                                    shadow-md hover:shadow-lg transition"
//                       >
//                         ✏️ Sửa
//                       </Link>
//                       <button
//                         onClick={() => xoaSach(b._id)}
//                         className="px-3 py-1 rounded-md text-white font-medium 
//                                    bg-gradient-to-r from-red-400 to-red-600 
//                                    hover:from-red-500 hover:to-red-700 
//                                    shadow-md hover:shadow-lg transition"
//                       >
//                         🗑️ Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {sachChuaDoc.length === 0 && (
//                   <tr>
//                     <td colSpan="4" className="p-4 text-center text-gray-500">
//                       Không có sách chưa đọc
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {/* phân trang */}
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 disabled={trangChuaDoc <= 1}
//                 onClick={() => setTrangChuaDoc(trangChuaDoc - 1)}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 ← Trang trước
//               </button>
//               <span>
//                 Trang {trangChuaDoc}/{Math.ceil(tongChuaDoc / gioiHan)}
//               </span>
//               <button
//                 disabled={trangChuaDoc >= Math.ceil(tongChuaDoc / gioiHan)}
//                 onClick={() => setTrangChuaDoc(trangChuaDoc + 1)}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Trang sau →
//               </button>
//             </div>
//           </div>

//           {/* ✅ Sách đã đọc */}
//           <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//             <h2 className="bg-green-100 p-4 font-semibold text-lg text-green-800">
//               ✅ Sách đã đọc
//             </h2>
//             <table className="w-full text-left text-sm">
//               <thead className="bg-gray-50 text-gray-600 uppercase">
//                 <tr>
//                   <th className="p-3">Tên sách</th>
//                   <th className="p-3">Tác giả</th>
//                   <th className="p-3">Thể loại</th>
//                   <th className="p-3">Ngày đọc</th>
//                   <th className="p-3 text-center">Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sachDaDoc.map((b) => (
//                   <tr key={b._id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{b.title}</td>
//                     <td className="p-3">{b.author}</td>
//                     <td className="p-3">{b.category}</td>
//                     <td className="p-3">
//                       {b.readAt ? new Date(b.readAt).toLocaleDateString("vi-VN") : ""}
//                     </td>
//                     <td className="p-3 text-center space-x-2">
//                       <Link
//                         to={`/edit/${b._id}`}
//                         className="px-3 py-1 rounded-md text-white font-medium 
//                                    bg-gradient-to-r from-blue-400 to-blue-600 
//                                    hover:from-blue-500 hover:to-blue-700 
//                                    shadow-md hover:shadow-lg transition"
//                       >
//                         ✏️ Sửa
//                       </Link>
//                       <button
//                         onClick={() => xoaSach(b._id)}
//                         className="px-3 py-1 rounded-md text-white font-medium 
//                                    bg-gradient-to-r from-red-400 to-red-600 
//                                    hover:from-red-500 hover:to-red-700 
//                                    shadow-md hover:shadow-lg transition"
//                       >
//                         🗑️ Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {sachDaDoc.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="p-4 text-center text-gray-500">
//                       Chưa có sách đã đọc
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {/* phân trang */}
//             <div className="flex justify-center items-center gap-4 mt-4">
//               <button
//                 disabled={trangDaDoc <= 1}
//                 onClick={() => setTrangDaDoc(trangDaDoc - 1)}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 ← Trang trước
//               </button>
//               <span>
//                 Trang {trangDaDoc}/{Math.ceil(tongDaDoc / gioiHan)}
//               </span>
//               <button
//                 disabled={trangDaDoc >= Math.ceil(tongDaDoc / gioiHan)}
//                 onClick={() => setTrangDaDoc(trangDaDoc + 1)}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Trang sau →
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ====== Bộ lọc (phải) ====== */}
//         <aside className="w-64 bg-white border rounded-xl shadow-sm p-6 h-fit">
//           <h2 className="font-bold text-lg text-gray-700 mb-4 flex items-center gap-2">
//             🔍 Bộ lọc
//           </h2>

//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-medium">Tên sách / Tác giả</label>
//               <input
//                 placeholder="Nhập từ khóa..."
//                 value={tuKhoa}
//                 onChange={(e) => setTuKhoa(e.target.value)}
//                 className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-medium">Thể loại</label>
//               <input
//                 placeholder="Nhập thể loại..."
//                 value={theLoai}
//                 onChange={(e) => setTheLoai(e.target.value)}
//                 className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-medium">Từ ngày</label>
//               <input
//                 type="date"
//                 value={tuNgay}
//                 onChange={(e) => setTuNgay(e.target.value)}
//                 className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-medium">Đến ngày</label>
//               <input
//                 type="date"
//                 value={denNgay}
//                 onChange={(e) => setDenNgay(e.target.value)}
//                 className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <button
//               onClick={() => {
//                 setTuKhoa("");
//                 setTheLoai("");
//                 setTuNgay("");
//                 setDenNgay("");
//                 setTrangChuaDoc(1);
//                 setTrangDaDoc(1);
//               }}
//               className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//             >
//               🧹 Xóa bộ lọc
//             </button>

//             <Link
//               to="/add"
//               className="mt-2 px-4 py-2 rounded-md text-white font-semibold 
//                          bg-gradient-to-r from-green-500 to-green-700 
//                          hover:from-green-600 hover:to-green-800 
//                          shadow-md hover:shadow-lg transition"
//             >
//               + Thêm sách
//             </Link>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Home() {
  const [sachChuaDoc, setSachChuaDoc] = useState([]);
  const [sachDaDoc, setSachDaDoc] = useState([]);

  // phân trang riêng
  const [trangChuaDoc, setTrangChuaDoc] = useState(1);
  const [tongChuaDoc, setTongChuaDoc] = useState(0);

  const [trangDaDoc, setTrangDaDoc] = useState(1);
  const [tongDaDoc, setTongDaDoc] = useState(0);

  const [gioiHan] = useState(5);

  // bộ lọc
  const [theLoai, setTheLoai] = useState("");
  const [tuKhoa, setTuKhoa] = useState("");
  const [tuNgay, setTuNgay] = useState("");
  const [denNgay, setDenNgay] = useState("");

  // lấy sách chưa đọc
  const laySachChuaDoc = async () => {
    try {
      const params = {
        page: trangChuaDoc,
        limit: gioiHan,
        status: "todo",
        category: theLoai,
        q: tuKhoa,
      };
      const res = await api.get("/books", { params });
      setSachChuaDoc(res.data.data);
      setTongChuaDoc(res.data.total);
    } catch (err) {
      console.error("Lỗi lấy sách chưa đọc:", err);
    }
  };

  // lấy sách đã đọc
  const laySachDaDoc = async () => {
    try {
      const params = {
        page: trangDaDoc,
        limit: gioiHan,
        status: "done",
        category: theLoai,
        q: tuKhoa,
        from: tuNgay,
        to: denNgay,
      };
      const res = await api.get("/books", { params });
      setSachDaDoc(res.data.data);
      setTongDaDoc(res.data.total);
    } catch (err) {
      console.error("Lỗi lấy sách đã đọc:", err);
    }
  };

  useEffect(() => {
    laySachChuaDoc();
  }, [trangChuaDoc, theLoai, tuKhoa]);

  useEffect(() => {
    laySachDaDoc();
  }, [trangDaDoc, theLoai, tuKhoa, tuNgay, denNgay]);

  const xoaSach = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa sách này?")) return;
    await api.delete(`/books/${id}`);
    laySachChuaDoc();
    laySachDaDoc();
  };

  const danhDauDaDoc = async (id) => {
    await api.put(`/books/${id}`, { status: "done", readAt: new Date() });
    laySachChuaDoc();
    laySachDaDoc();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Nút thêm sách trên cùng */}
      <div className="flex justify-end mb-4">
        <Link
          to="/add"
          className="px-4 py-2 rounded-md text-white font-semibold 
                     bg-gradient-to-r from-green-500 to-green-700 
                     hover:from-green-600 hover:to-green-800 
                     shadow-md hover:shadow-lg transition"
        >
          + Thêm sách
        </Link>
      </div>

      <div className="flex gap-6">
        {/* ====== Danh sách sách (trái) ====== */}
        <div className="flex-1 space-y-10">
          {/* 📖 Sách chưa đọc */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-yellow-100 p-4 font-semibold text-lg text-yellow-800">
              📖 Sách chưa đọc
            </h2>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  <th className="p-3">Tên sách</th>
                  <th className="p-3">Tác giả</th>
                  <th className="p-3">Thể loại</th>
                  <th className="p-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {sachChuaDoc.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{b.title}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3">{b.category}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => danhDauDaDoc(b._id)}
                        className="px-3 py-1 rounded-md text-white font-medium 
                                   bg-gradient-to-r from-green-400 to-green-600 
                                   hover:from-green-500 hover:to-green-700 
                                   shadow-md hover:shadow-lg transition"
                      >
                        ✅ Đánh dấu đã đọc
                      </button>
                      <Link
                        to={`/edit/${b._id}`}
                        className="px-3 py-1 rounded-md text-white font-medium 
                                   bg-gradient-to-r from-blue-400 to-blue-600 
                                   hover:from-blue-500 hover:to-blue-700 
                                   shadow-md hover:shadow-lg transition"
                      >
                        ✏️ Sửa
                      </Link>
                      <button
                        onClick={() => xoaSach(b._id)}
                        className="px-3 py-1 rounded-md text-white font-medium 
                                   bg-gradient-to-r from-red-400 to-red-600 
                                   hover:from-red-500 hover:to-red-700 
                                   shadow-md hover:shadow-lg transition"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {sachChuaDoc.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      Không có sách chưa đọc
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* phân trang */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                disabled={trangChuaDoc <= 1}
                onClick={() => setTrangChuaDoc(trangChuaDoc - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                ← Trang trước
              </button>
              <span>
                Trang {trangChuaDoc}/{Math.ceil(tongChuaDoc / gioiHan)}
              </span>
              <button
                disabled={trangChuaDoc >= Math.ceil(tongChuaDoc / gioiHan)}
                onClick={() => setTrangChuaDoc(trangChuaDoc + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Trang sau →
              </button>
            </div>
          </div>

          {/* ✅ Sách đã đọc */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-green-100 p-4 font-semibold text-lg text-green-800">
              ✅ Sách đã đọc
            </h2>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  <th className="p-3">Tên sách</th>
                  <th className="p-3">Tác giả</th>
                  <th className="p-3">Thể loại</th>
                  <th className="p-3">Ngày đọc</th>
                  <th className="p-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {sachDaDoc.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{b.title}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3">{b.category}</td>
                    <td className="p-3">
                      {b.readAt
                        ? new Date(b.readAt).toLocaleDateString("vi-VN")
                        : ""}
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <Link
                        to={`/edit/${b._id}`}
                        className="px-3 py-1 rounded-md text-white font-medium 
                                   bg-gradient-to-r from-blue-400 to-blue-600 
                                   hover:from-blue-500 hover:to-blue-700 
                                   shadow-md hover:shadow-lg transition"
                      >
                        ✏️ Sửa
                      </Link>
                      <button
                        onClick={() => xoaSach(b._id)}
                        className="px-3 py-1 rounded-md text-white font-medium 
                                   bg-gradient-to-r from-red-400 to-red-600 
                                   hover:from-red-500 hover:to-red-700 
                                   shadow-md hover:shadow-lg transition"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {sachDaDoc.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      Chưa có sách đã đọc
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* phân trang */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                disabled={trangDaDoc <= 1}
                onClick={() => setTrangDaDoc(trangDaDoc - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                ← Trang trước
              </button>
              <span>
                Trang {trangDaDoc}/{Math.ceil(tongDaDoc / gioiHan)}
              </span>
              <button
                disabled={trangDaDoc >= Math.ceil(tongDaDoc / gioiHan)}
                onClick={() => setTrangDaDoc(trangDaDoc + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Trang sau →
              </button>
            </div>
          </div>
        </div>

        {/* ====== Bộ lọc (phải) ====== */}
        <aside className="w-64 bg-white border rounded-xl shadow-sm p-6 h-fit">
          <h2 className="font-bold text-lg text-gray-700 mb-4 flex items-center gap-2">
            🔍 Bộ lọc
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tên sách / Tác giả</label>
              <input
                placeholder="Nhập từ khóa..."
                value={tuKhoa}
                onChange={(e) => setTuKhoa(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Thể loại</label>
              <input
                placeholder="Nhập thể loại..."
                value={theLoai}
                onChange={(e) => setTheLoai(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Từ ngày</label>
              <input
                type="date"
                value={tuNgay}
                onChange={(e) => setTuNgay(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Đến ngày</label>
              <input
                type="date"
                value={denNgay}
                onChange={(e) => setDenNgay(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              onClick={() => {
                setTuKhoa("");
                setTheLoai("");
                setTuNgay("");
                setDenNgay("");
                setTrangChuaDoc(1);
                setTrangDaDoc(1);
              }}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              🧹 Xóa bộ lọc
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
