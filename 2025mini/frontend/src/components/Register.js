import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      // 회원가입 후 현재 푸는 문제 id 확인 및 리디렉션 처리
      localStorage.setItem("currentProblemId", 1);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login"); // 회원가입 후 3초 뒤 로그인 페이지로 이동
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "회원가입 실패");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">회원가입</h2>

      {/* 회원가입 성공/실패 메시지 */}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleRegister} className="register-form">
        <label className="register-label">아이디</label>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />

        <label className="register-label">이메일</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />

        <label className="register-label">비밀번호</label>
        {/* 비밀번호 입력 필드 + 버튼 */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "12px",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontWeight: "bold",
            }}
          >
            {showPassword ? "👁 Hide" : "👁 Show"}
          </button>
        </div>

        <label className="register-label">비밀번호 확인</label>
        {/* 비밀번호 확인 입력 필드 + 버튼 */}
        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "12px",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontWeight: "bold",
            }}
          >
            {showConfirmPassword ? "👁 Hide" : "👁 Show"}
          </button>
        </div>

        <button type="submit" className="register-button">회원가입</button>
      </form>

      <p className="login-link">
        이미 계정이 있나요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default Register;
