import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";

const Even = () => {
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
    if (user.currentProblemId < 2) {
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
        { answer, problemId: 2, userId },
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
          navigate("/problem/littlebiggerstar");
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
      {/* 전체를 중앙 정렬 */}
      <div className="flex flex-col items-center text-center" style={{ marginTop: "2rem" }}>
        
        {/* 스토리 부분: 회색 박스 + 큰 글씨 + 여백 */}
        <div
          className="bg-gray-200 text-xl p-4 mb-6"
          style={{ maxWidth: "600px", marginTop: "3rem" }} // 추가 여백 (marginTop)
        >
          <p>
            우주 최강 퍼즐 동아리 KAIST Puple!
            <br />
            …에 들어가고 싶어하는 퍼플이.
            <br />
            퍼즐을 너무 좋아하는 퍼플이는 Puple 부원이 될
            <br />
            날만을 손꼽아 기다리고 있어요.
          </p>
        </div>
        <br />
        <br />
        <br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-4" >이븐한 식사</h2>

        {/* 문제 내용: 중앙 정렬 */}
        <div
          className="text-gray-700 my-6"
          style={{ maxWidth: "600px", textAlign: "center" }}
        >
          <p>
          <br />
          <br />
            두 명의 심사위원 A, B가 참가자들의 요리를 맛보고 점수를 매긴다.
            <br />
            두 심사위원의 평가 항목은 동일하지만, 각자 점수를 매기는 방식이 다르다.
          </p>
          <br />
          <p>
            참가자1 : 저는 신선한 샐러드를 만들어 봤습니다.<br />
            심사위원 A : 저는 10점 드리겠습니다.<br />
            심사위원 B : 저는 50점 드리겠습니다.<br />
          </p>
          <p>
            참가자2 : 저는 따뜻한 스프를 만들어 봤습니다.<br />
            심사위원 A : 저는 40점 드리겠습니다.<br />
            심사위원 B : 저는 104점 드리겠습니다.<br />
          </p>
          <p>
            참가자3 : 저는 찌개를 만들어 봤습니다. 아직 끓고 있으니 조심해주세요.<br />
            심사위원 A : 저는 100점 드리겠습니다.<br />
            심사위원 B : 저는 X점 드리겠습니다.<br />
          </p>
          <p>
            참가자4 : 저는 정말 차가운 아이스크림을 만들어 봤습니다.<br />
            심사위원 A : 저는 Y점 드리겠습니다.<br />
            심사위원 B : 저도 Y점 드리겠습니다.<br />
          </p>

          {/* X×Y의 값은? + [Answer Type: Number], 중앙 정렬 */}
          <div className="my-4">
            <p className="font-bold">X×Y의 값은?</p>
            <p className="font-bold">[Answer Type: Number]</p>
          </div>
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

export default Even;
