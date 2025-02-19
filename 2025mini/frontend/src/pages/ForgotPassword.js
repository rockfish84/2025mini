import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("이메일을 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "비밀번호 찾기 요청 중 오류 발생");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold my-4">비밀번호 찾기</h1>
      <p className="text-gray-700 mb-6">이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md w-80 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          비밀번호 찾기
        </button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
