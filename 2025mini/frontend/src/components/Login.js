import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 로그인 메시지

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login", 
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // 로그인 성공 시 토큰을 localStorage에 저장
      localStorage.setItem("token", response.data.token);  // 로그인 후 토큰 저장
      setMessage("로그인 성공!");
      
      // 페이지 새로고침 후 홈페이지로 리디렉션
      window.location.reload();  // 페이지 새로고침
      window.location.href = "/";  // 홈페이지로 리디렉션

    } catch (error) {
      setMessage(error.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>

      {message && <p className="error-message">{message}</p>}  {/* 로그인 메시지 */}

      <form onSubmit={handleLogin} className="login-form">
        <label className="login-label">아이디</label>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <label className="login-label">비밀번호</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-button">로그인</button>
      </form>

      <p className="register-link">
        계정이 없나요? <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
