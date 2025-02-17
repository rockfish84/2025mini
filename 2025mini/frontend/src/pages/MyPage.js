import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login"); // 로그인 안 했으면 로그인 페이지로 이동
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

    const confirmReset = window.confirm("계정을 초기화합니다. 모든 클리어를 포함한 진행상황이 삭제됩니다");
    if (!confirmReset) return;

    try {
      await axios.post("http://localhost:5000/api/user/reset", { userId: user._id });
      alert("계정이 초기화되었습니다. 다시 로그인해주세요.");
      handleLogout();
    } catch (error) {
      alert("계정 초기화 중 오류가 발생했습니다.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/change-password", {
        userId: user._id,
        currentPassword,
        newPassword,
      });

      alert(response.data.message);
      setShowPasswordChange(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-3xl font-bold my-4">마이페이지</h1>
      {user && <h2 className="text-2xl my-2">{user.username}님, 환영합니다!</h2>}

      <div className="mt-8">
        <h3 className="text-xl font-bold my-4">로그아웃</h3>
        <button onClick={handleLogout} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
          로그아웃
        </button>
      </div>

      {/* 비밀번호 변경 버튼 (클릭 시 입력창 표시) */}
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
              placeholder="새 비밀번호"
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
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-full"
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

      <div className="mt-8">
        <h3 className="text-xl font-bold my-4 text-red-600">위험구역</h3>
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
