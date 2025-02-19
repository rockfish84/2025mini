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
import NotFound from "./pages/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import Clear from "./pages/Clear";  // 클리어 페이지

import Example from "./pages/problem/Example";
import Even from "./pages/problem/Even";
import Littlebiggerstar from "./pages/problem/Littlebiggerstar";
import Recruting from "./pages/problem/Recruting";
import Wellseen from "./pages/problem/Wellseen";
import Introduce from "./pages/problem/Introduce";
import Gohome from "./pages/problem/Gohome";
import Timerun from "./pages/problem/Timerun";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(storedUser);
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/clear" element={<Clear />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        
        {/* 문제 페이지 라우팅 */}
        <Route path="/problem/example" element={<Example />} />
        <Route path="/problem/even" element={<Even />} />
        <Route path="/problem/littlebiggerstar" element={<Littlebiggerstar />} />
        <Route path="/problem/recruting" element={<Recruting />} />
        <Route path="/problem/wellseen" element={<Wellseen />} />
        <Route path="/problem/introduce" element={<Introduce />} />
        <Route path="/problem/gohome" element={<Gohome />} />
        <Route path="/problem/timerun" element={<Timerun />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
