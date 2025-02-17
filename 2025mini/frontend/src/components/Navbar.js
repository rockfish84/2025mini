import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);  // 로그인 상태를 확인하는 변수
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);  // 토큰이 있으면 로그인된 상태
    } else {
      setUser(null);  // 토큰이 없으면 로그인되지 않은 상태
    }
  }, []);  // 페이지가 로드될 때 로그인 상태 확인

  const handleLogout = () => {
    localStorage.removeItem("token");  // 로그아웃 시 로컬스토리지에서 토큰 제거
    setUser(null);  // 로그인 상태 해제
    navigate("/");  // 홈페이지로 리디렉션
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md px-8">
      {/* 로고 */}
      <div className="flex-1 text-left">
        <h1 className="text-xl font-extrabold text-purple-700">2025 동박 미니 미궁</h1>
      </div>

      {/* 네비게이션 메뉴 */}
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

      {/* 로그인 / 마이페이지 */}
      <div className="flex-1 text-right">
        {user ? (
          <>
            <Link to="/mypage" className="text-lg font-bold text-blue-500 hover:text-blue-700">마이페이지</Link>
            <button
              onClick={handleLogout}
              className="ml-4 text-lg font-bold text-red-500 hover:text-red-700"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login" className="text-lg font-bold text-blue-500 hover:text-blue-700">로그인</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
