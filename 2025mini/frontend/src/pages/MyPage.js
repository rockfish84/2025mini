import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");  // 로그인하지 않으면 로그인 페이지로 리디렉션
    } else {
      setUserInfo({ username: "luffy84", email: "luffy84@example.com" });  // 유저 정보 로딩 (예시)
    }
  }, [navigate]);

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">마이페이지</h2>
      {userInfo ? (
        <div className="mypage-info">
          <p>아이디: {userInfo.username}</p>
          <p>이메일: {userInfo.email}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default MyPage;
