import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WellSeen1 from "../../assets/wellseen1.png";
import WellSeen2 from "../../assets/wellseen2.png";


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
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("로그인이 필요합니다.");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      const response = await axios.post(
        "http://localhost:5000/api/problem/submit",
        { answer, problemId: 5, userId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📩 서버 응답:", response.data);

      if (response.data.isCorrect === true) {

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
            Puple에 들어가려면 몇 가지 테스트를 거쳐야 된다고 합니다!
          <br/>
            물론 Puple에 관심이 많은 사람일 수록
          <br/>
            Puple 부원이 되기에 유리하겠죠?
          <br/>
             과연 퍼플이는 테스트를 통과할 수 있을까요?

          </p>
        </div>
        <br /><br /><br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-6">이거 어디서 많이 봤는데</h2>
   
        {/* 문제(사진 두 개) */}
        <div className="my-4" style={{ transform: "scale(1.0)", transformOrigin: "center" }}>
          <img
            src={WellSeen1}
            style={{ width: "400px", height: "auto" }}
          />
        </div>
        <div className="my-4" style={{ transform: "scale(1.3)", transformOrigin: "center" }}>
          <img
            src={WellSeen2}
            style={{ width: "400px", height: "auto" }}
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
