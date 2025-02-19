import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://port-0-mini-2025-m7c2eilx1e9c2c93.sel4.cloudtype.app/api/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // JWT 저장

        // 🔥 JWT 디코딩 후 userId 확인
        try {
          const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
          
          if (!decodedToken.userId) {
            console.error("🚨 JWT에서 userId를 찾을 수 없음");
            setMessage("로그인 실패: 사용자 정보가 올바르지 않습니다.");
            return;
          }

          setMessage("로그인 성공!");
          navigate("/"); // 홈으로 이동
          window.location.reload();
        } catch (decodeError) {
          console.error("🚨 JWT 디코딩 오류:", decodeError);
          setMessage("로그인 실패: JWT 오류 발생");
        }
      } else {
        setMessage("로그인 실패: 토큰이 없습니다.");
      }
    } catch (error) {
      console.error("🚨 로그인 요청 오류:", error);
      setMessage(error.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>

      {message && <p className="error-message">{message}</p>}

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
          type="password"  /* 🔥 비밀번호 입력 필드 수정 */
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
