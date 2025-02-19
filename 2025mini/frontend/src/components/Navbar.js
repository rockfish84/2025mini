import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      setUser(!!localStorage.getItem("token"));
    };

    checkUser();

    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md px-8">
      {/* 🔥 2025 동박 미니 미궁 클릭 시 홈페이지(/)로 이동 */}
      <div className="flex-1 text-left">
        <Link to="/" className="text-xl font-extrabold text-purple-700 hover:text-purple-500">
          2025 동박 미니 미궁
        </Link>
      </div>

      <div
        className="flex-1 flex justify-center"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "50px",
          whiteSpace: "nowrap",
        }}
      >
        <Link to="/" className="text-lg font-bold text-gray-700 hover:text-purple-500">메인</Link>
        <Link to="/announcement" className="text-lg font-bold text-gray-700 hover:text-purple-500">공지사항</Link>
        <Link to="/howto" className="text-lg font-bold text-gray-700 hover:text-purple-500">진행방법</Link>
        <Link to="/history" className="text-lg font-bold text-gray-700 hover:text-purple-500">히스토리</Link>
        <Link to="/creators" className="text-lg font-bold text-gray-700 hover:text-purple-500">제작자</Link>
        <Link to="/ranking" className="text-lg font-bold text-gray-700 hover:text-purple-500">명예의 전당</Link>
      </div>

      <div className="flex-1 text-right">
        {user ? (
          <Link to="/mypage" className="text-lg font-bold text-blue-500 hover:text-blue-700">마이페이지</Link>
        ) : (
          <Link to="/login" className="text-lg font-bold text-blue-500 hover:text-blue-700">로그인</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
