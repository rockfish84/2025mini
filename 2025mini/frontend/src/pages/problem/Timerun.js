import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import TimerunImage from "../../assets/timerun.png"; // 문제 이미지 추가

const Timerun = () => {
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
    if (user.currentProblemId < 8) {
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
        { answer, problemId: 8, userId },
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
          navigate("/clear");
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
            음냐… 지금 몇 시지…?
            <br />
            헉, 이게 무슨 일이야!
            <br />
            <br />
            Puple 부원이 되는 꿈을 꾸느라 퍼플이가
            <br />
            리쿠르팅 지원을 놓치고 말았어요!
            <br />
            이건 있을 수 없는 일이야!!!
            <br />
            <br />
            주저앉아 울고 있는 퍼플이를 도와줄 수 있는 방법이 없을까요?
          </p>
        </div>
        <br /><br /><br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-6">시간을 달려서</h2>
   
        {/* 문제 설명 */}
        <div className="text-gray-700 my-6">
          <p>우주최강💫 퍼즐동아리 KAIST Puple입니다!</p>
          <p>밑의 링크에서 봄학기 리크루팅에 참여해주세요!</p>
          <p>주소는 아래 문제를 풀면 알려드릴께요!</p>
          <p>아… 근데 리크루팅이 이미 끝나버렸군요…!</p>
          <p>밑의 퀴즈도 2024년 12월 1일까지밖에 못 푸는 문제였는데…</p>
          <br />
          <p className="font-bold">
            걱정 마세요! 타임머신을 타고 시간을 되돌리면 4자리 비밀코드를 얻을 수 있을거에요!
          </p>

          <br/>
          <br/>
          <br/>
        </div>

        {/* 문제 이미지 */}
        <div className="my-4" style={{ transform: "scale(1.3)", transformOrigin: "center" }}>
          <img
            src={TimerunImage}
            alt="시간을 달려서 문제 이미지"
            style={{ width: "400px", height: "auto" }}
          />
        </div>

        {/* Answer Type 안내 */}
        <br/>
        <br/>
        <div className="text-gray-700 my-6">
          [Answer Type: English]
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

export default Timerun;
