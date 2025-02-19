import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import littleBiggerstarImg from "../../assets/littlebiggerstar.png";


const Littlebiggerstar = () => {
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
    if (user.currentProblemId < 3) {
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
        { answer, problemId: 3, userId },
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
          navigate("/problem/recruting");
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
            퍼플이는 언제나 퍼즐 생각만 한답니다.
            <br />
            일어날 때도, 씻을 때도, 공부할 때도…
            <br />
            그리고 밥을 먹을 때도 말이죠!
            <br /><br />
            마침 퍼플이도 배가 고프다네요!
            <br /> 
            요즘 KAIST 새내기들은 어디서 밥을 먹더라…?
          </p>
        </div>
        <br />
        <br />
        <br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-4">Little Bigger Star</h2>

        {/* 문제 (사진) */}
        <div
          className="text-gray-700 my-6"
          style={{ maxWidth: "600px", textAlign: "center" }}
        >
          {/* 사진 */}
          <img 
            src={littleBiggerstarImg}
            alt="Little Bigger Star 문제 이미지"
            className="my-4 scale-130 origin-center"
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

export default Littlebiggerstar;
