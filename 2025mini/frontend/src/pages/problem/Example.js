import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

const Example = () => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(atob(storedToken.split(".")[1]));
    if (user.currentProblemId < 1) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/problem/submit",
        { answer, problemId: 1 },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📩 서버 응답:", response.data);

      if (response.data.isCorrect === true) {

        // ✅ 토큰 가져오기
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("로그인이 필요합니다.");
          return;
        }
        
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.userId;

        // ✅ 문제 정답 제출 후 currentProblemId 증가 + JWT 갱신
        const updateResponse = await axios.post(
          "http://localhost:5000/api/user/update-problem",
          { userId }
        );

        if (updateResponse.data.token) {
          localStorage.setItem("token", updateResponse.data.token); // ✅ 새로운 JWT 저장
        }

        setTimeout(() => {
          navigate("/problem/even");
        }, 100);
      } else {
        setMessage("정답이 틀렸습니다.");
      }
    } catch (error) {
      console.error("🚨 서버 오류:", error);
      setMessage(error.response?.data?.message || "서버 오류 발생");
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold my-6">복면산?</h2>
        <img 
          src="/path/to/problem-image.jpg" 
          alt="결혼반지 이미지" 
          className="w-full max-w-xs my-4"
        />
        <p className="text-gray-700 my-6">
          산발처럼 흐트러진 옷들이 군데군데 놓여 있었다.<br/>
          수많은 장면을 머릿속에 되새기며 작은 방안을 떠돌았다.<br/>
          보석상의 바쁜 손끝에 의해 엮여진 그 몇몇의 구석들을 떠올렸다.<br/><br/>
          12년을 더 하던지, 아니면 내일 이 세상에서 없을까...
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 rounded-md" placeholder="정답을 입력하세요" />
          <button type="submit" className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md">제출</button>
        </form>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </PageLayout>
  );
};

export default Example;
