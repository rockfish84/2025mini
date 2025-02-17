import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Announcement from "./pages/Announcement";
import HowToPlay from "./pages/HowToPlay";
import History from "./pages/History";
import Creators from "./pages/Creators";
import Ranking from "./pages/Ranking";
import MyPage from "./pages/MyPage"; 
import Problem from "./pages/Problem";
import NotFound from "./pages/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";  // 이메일 인증 라우트 추가

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(storedUser);  // JWT 토큰이 있으면 로그인된 상태로 표시
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/howto" element={<HowToPlay />} />
        <Route path="/history" element={<History />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
