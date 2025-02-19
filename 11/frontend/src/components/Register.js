import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("z/api/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem("currentProblemId", 1);
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">회원가입</h2>

      {message && <p className="success-message">{message}</p>}
      {loading && <p className="success-message">대기중...</p>}

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
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <label className="register-label">비밀번호 확인</label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />

        <button
          type="submit"
          className="register-button"
          disabled={loading}
        >
          회원가입
        </button>
      </form>

      <p className="login-link">
        이미 계정이 있나요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default Register;
