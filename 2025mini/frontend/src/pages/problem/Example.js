import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import ExampleImage1 from "../../assets/example1.png";
import ExampleImage2 from "../../assets/example2.png";

const Example = () => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [showSolution, setShowSolution] = useState(false); // ❗ 풀이/정답 보기 토글
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
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("로그인이 필요합니다.");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      const response = await axios.post(
        "http://localhost:5000/api/problem/submit",
        { answer, problemId: 1, userId },
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

  // 풀이 / 정답 보기 버튼 클릭 시
  const toggleSolution = () => {
    setShowSolution((prev) => !prev);
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center" style={{ marginTop: "2rem" }}>
        
        {/* 상단 안내 문구 */}
        <div
          className="my-6"
          style={{ maxWidth: "600px", marginTop: "3rem" }}
        >
          <p className="text-2xl text-gray-700">
            미궁에 들어가기 앞서, 어떠한 문제들이 있는지 
            <br />
            예시를 보여드릴게요.
          </p>
        </div>
        <br />
        <br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-4">복면산?</h2>
        <br />
        <br />

        {/* 첫 번째 이미지 (1.3배 고정) */}
        <div className="my-4" style={{ transform: "scale(1.3)", transformOrigin: "center" }}>
          <img
            src={ExampleImage1}
            alt="복면산 문제 예시 이미지"
            style={{ width: "400px", height: "auto" }}
          />
        </div>
        <br />
        <br />
        <br />
            <br />

        {/* 풀이 / 정답 보기 버튼 */}
        <button
          onClick={toggleSolution}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showSolution ? "풀이 / 정답 숨기기" : "풀이 / 정답 보기"}
        </button>

        {/* showSolution가 true일 때만 표시되는 영역 */}
        {showSolution && (
          <>
            {/* 중간 설명 텍스트 */}
            <div
              className="text-gray-700 my-6"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              <p>
              <br />
              <br />
                이 문제를 보면, 일반적인 복면산이라면 여섯자리 수 + 여섯자리 수 = 다섯자리 수가
                나오지 않습니다. 뭔가 이상하죠? 문제에서 알려준 규칙은 없지만, 이러한 이상한 점을
                관찰하고, 그것을 토대로 규칙을 세워 풀어나가는 퍼즐을 미궁 퍼즐이라고 해요.
              </p>
              <br />
              <p>
                그렇다면, 이 복면산에서는 “숫자가 들어가지 않는다”라고 생각할 수 있겠네요.
                <br />
                이제 적절한 것을 채워넣어야 할텐데, 후보 중에서 “글자”가 있을 것 같아요.
                <br />
                그런데 이 안에 들어갈 글자는 너무나 많은데, 이 문제를 풀 수 있을까요?
              </p>
              <br />
              <p>
                이 미궁에서는 저희 동아리, KAIST PUPLE과 관련된 요소를 활용하는 문제들이 나올
                수도 있어요. 이 문제는 저희 동아리의 이름인 <strong>puple</strong>의 뜻,
                puzzle과 people의 합성어라는 사실을 알고 문제를 보면, 같은 그림은 같은 글자를
                나타내고 있다는 것을 알 수 있고, 답이 <strong>puple</strong>이 된다는 것을 알 수 있어요.
              </p>
            </div>
            <br />
            <br />

            {/* 두 번째 이미지 (확대 1.7배 예시) */}
            <div className="my-4" style={{ transform: "scale(1.7)", transformOrigin: "center" }}>
              <img
                src={ExampleImage2}
                alt="복면산 문제 풀이 예시 이미지"
                className="w-full max-w-xs my-4"
              />
            </div>
            <br />
            <br />

            {/* 마지막 안내 문구 */}
            <div
              className="text-gray-700 my-6"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              자, 그럼 미궁을 시작해 볼까요? <br />
              미궁의 끝에서 다시 보도록 해요!
            </div>
          </>
        )}
        <br />
        <br />

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

        {/* 결과 메시지 */}
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </PageLayout>
  );
};

export default Example;
