import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      if (!decodedToken?.userId) {
        navigate("/login");
        return;
      }

      axios
        .get(`http://localhost:5000/api/user/${decodedToken.userId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          navigate("/login");
        });
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleResetAccount = async () => {
    if (!user) return;

    const confirmReset = window.confirm(
      "⚠️ 계정을 초기화하면 진행 상황이 모두 삭제됩니다.\n정말 초기화하시겠습니까?"
    );
    if (!confirmReset) return;

    try {
      await axios.post("http://localhost:5000/api/user/reset", { userId: user._id });
      alert("✅ 계정이 초기화되었습니다. 다시 로그인해주세요.");
      handleLogout();
    } catch (error) {
      alert("❌ 계정 초기화 중 오류가 발생했습니다.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("⚠️ 모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ 새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("⚠️ 비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/change-password", {
        userId: user._id,
        currentPassword,
        newPassword,
      });

      setMessage("✅ " + response.data.message);
      setTimeout(() => {
        setShowPasswordChange(false);
        setMessage("");
      }, 2000);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다."));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("⚠️ 이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/password-reset-request", { email });
      setMessage("📩 " + response.data.message);
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "비밀번호 찾기 중 오류가 발생했습니다."));
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-3xl font-bold my-4">마이페이지</h1>
      {user && <h2 className="text-2xl my-2">{user.username}님, 환영합니다!</h2>}

      {/* 로그아웃 */}
      <div className="mt-8">
        <h3 className="text-xl font-bold my-4">로그아웃</h3>
        <button onClick={handleLogout} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
          로그아웃
        </button>
      </div>

      {/* 비밀번호 변경 */}
      <div className="mt-8 w-80">
        <h3 className="text-xl font-bold my-4">비밀번호 변경</h3>
        {!showPasswordChange ? (
          <button
            onClick={() => setShowPasswordChange(true)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-full"
          >
            비밀번호 변경
          </button>
        ) : (
          <>
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="password"
              placeholder="새 비밀번호 (최소 6자)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded-md w-full mb-2"
            />
            {message && <p className="text-red-600">{message}</p>}
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            >
              변경하기
            </button>
            <button
              onClick={() => setShowPasswordChange(false)}
              className="mt-2 px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 w-full"
            >
              취소
            </button>
          </>
        )}
      </div>

      {/* 비밀번호 찾기 */}
      <div className="mt-8 w-80">
        <h3 className="text-xl font-bold my-4">비밀번호 찾기</h3>
        {!showForgotPassword ? (
          <button
            onClick={() => setShowForgotPassword(true)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-full"
          >
            비밀번호 찾기
          </button>
        ) : (
          <>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md w-full mb-2"
            />
            {message && <p className="text-red-600">{message}</p>}
            <button
              onClick={handleForgotPassword}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            >
              이메일로 비밀번호 재설정 링크 보내기
            </button>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="mt-2 px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 w-full"
            >
              취소
            </button>
          </>
        )}
      </div>

      {/* 계정 초기화 */}
      <div className="mt-8">
        <h3 className="text-xl font-bold my-4 text-red-600">⚠️ 위험구역</h3>
        <button
          onClick={handleResetAccount}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          계정 초기화
        </button>
      </div>
    </div>
  );
};

export default MyPage;
