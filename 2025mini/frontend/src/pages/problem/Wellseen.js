import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

const Wellseen = () => {
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
    if (user.currentProblemId < 5) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/problem/submit",
        { answer, problemId: 5 },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📩 서버 응답:", response.data);

      if (response.data.isCorrect === true) {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("로그인이 필요합니다.");
          return;
        }
        
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.userId;

        // 문제 정답 제출 후 currentProblemId 증가 + JWT 갱신
        const updateResponse = await axios.post(
          "http://localhost:5000/api/user/update-problem",
          { userId }
        );

        if (updateResponse.data.token) {
          localStorage.setItem("token", updateResponse.data.token);
        }

        setTimeout(() => {
          navigate("/problem/introduce");
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
      <div className="flex flex-col items-center text-center" style={{ marginTop: "2rem" }}>
        
        {/* 스토리 부분: 회색 박스 + 큰 글씨 + 여백 */}
        <div
          className="bg-gray-200 text-xl p-4 mb-6"
          style={{ maxWidth: "600px", marginTop: "3rem" }}
        >
          <p>
            아직 테스트는 끝나지 않았다!
            <br />
            포스터를 봤다고 Puple에 대한 사랑을 어필할 수 있을 줄 알았나요?
            <br />
            Puple 부원이 되려면 이 정도로는 부족하다고요!
          </p>
        </div>
        <br /><br /><br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-6">이거 어디서 많이 봤는데</h2>
   
        {/* 문제(사진 두 개) */}
        <div
          className="text-gray-700 my-6"
          style={{ maxWidth: "600px", textAlign: "center" }}
        >
          {/* 첫 번째 사진 */}
          <img 
            src="/images/problem1.png"  // 예시 경로
            alt="문제 이미지 1"
            className="w-full max-w-xs my-4"
          />

          {/* 두 번째 사진 */}
          <img 
            src="/images/problem2.png"  // 예시 경로
            alt="문제 이미지 2"
            className="w-full max-w-xs my-4"
          />
        </div>

        {/* 정답 입력 폼 */}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 rounded-md"
            placeholder="정답을 입력하세요"
          />
          <button
            type="submit"
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md"
          >
            제출
          </button>
        </form>

        {/* 메시지 표시 */}
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </PageLayout>
  );
};

export default Wellseen;
