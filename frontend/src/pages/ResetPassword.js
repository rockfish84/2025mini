import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage("모든 필드를 입력하세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("https://port-0-mini-2025-m7c2eilx1e9c2c93.sel4.cloudtype.app/api/reset-password", { token, newPassword });
      setMessage(response.data.message);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "비밀번호 변경 중 오류 발생");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold my-4">비밀번호 재설정</h1>
      <p className="text-gray-700 mb-6">새로운 비밀번호를 입력하세요.</p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded-md w-80 mb-4"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded-md w-80 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          비밀번호 변경
        </button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default ResetPassword;
