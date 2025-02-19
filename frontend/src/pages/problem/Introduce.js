import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

const Introduce = () => {
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
    if (user.currentProblemId < 6) {
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
        "https://port-0-mini-2025-m7c2eilx1e9c2c93.sel4.cloudtype.app/api/problem/submit",
        { answer, problemId: 6, userId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📩 서버 응답:", response.data);

      if (response.data.isCorrect === true) {

        const updateResponse = await axios.post(
          "https://port-0-mini-2025-m7c2eilx1e9c2c93.sel4.cloudtype.app/api/user/update-problem",
          { userId }
        );

        if (updateResponse.data.token) {
          localStorage.setItem("token", updateResponse.data.token);
        }

        setTimeout(() => {
          navigate("/problem/gohome");
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
        <br/>
        <br/>
        
        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-6">자기소개</h2>
        
        {/* 문제 내용 */}
        <div
          className="text-gray-700 my-6"
          style={{ maxWidth: "600px", textAlign: "center" }}
        >
          <p>
            E: 난 여기저기를 살피는 걸 좋아해!
            <br />
            S: 난 어디서 보든지 평평하단다!
            <br />
            C: 난 항상 사람들을 품에 담고 있어.
            <br />
            A: 난 운이 좋은 사람들한테 선물을 줘.
            <br />
            P: 난 사람들을 가르치는 일을 하고 있어!
          </p>
          <br />
          <p>
            E: 우리가 누구게?
          </p>
          <br />
          <p className="font-bold">Answer Type: 한글 다섯 글자</p>
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

export default Introduce;
