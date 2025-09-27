import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700 mt-4">Trang bạn tìm không tồn tại.</p>
      <Link
        to="/"
        className="mt-6 px-5 py-2 rounded-lg text-white font-medium
                   bg-gradient-to-r from-blue-500 to-blue-700 
                   hover:from-blue-600 hover:to-blue-800 
                   shadow-md transition"
      >
        ⬅️ Về trang chủ
      </Link>
    </div>
  );
}
