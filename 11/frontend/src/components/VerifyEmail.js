import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      axios.get(`http://localhost:5000/api/verify-email?token=${token}`)
        .then((response) => {
          // 인증이 완료되었으면 백엔드에서 리디렉션을 처리하기 때문에 별도 메시지 처리 필요 없음
          setMessage(response.data.message); // 여기에서 로그인 페이지로 이동하는 메시지만 보여줍니다.
          setTimeout(() => {
            navigate("/login");  // 인증 후 로그인 페이지로 자동 리디렉션
          }, 3000);
        })
        .catch((error) => {
          setMessage(error.response?.data?.message || "인증 실패");
        });
    }
  }, [navigate]);

  return (
    <div className="verify-email-container">
      <h3>{message}</h3>  {/* 인증 완료 메시지 표시 */}
    </div>
  );
};

export default VerifyEmail;
