import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const History = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.warn("🔒 로그인 필요: 로그인 페이지로 이동");
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(atob(storedToken.split(".")[1]));
      if (!userData?.userId) {
        console.error("🚨 userId 없음, 로그인 페이지로 이동");
        navigate("/login");
        return;
      }

      setUser(userData);

      // 사용자 정보 가져오기
      axios
        .get(`http://localhost:5000/api/user/${userData.userId}`)
        .then((res) => {
          const { currentProblemId } = res.data;

          // 사용자가 푼 문제 리스트
          const problems = [
            { problemId: 1, title: "복면산?", path: "/problem/example" },
            { problemId: 2, title: "이븐한 식사", path: "/problem/even" },
            { problemId: 3, title: "Little Bigger Star", path: "/problem/littlebiggerstar" },
            { problemId: 4, title: "리크루팅 대모험", path: "/problem/recruting" },
            { problemId: 5, title: "이거 어디서 많이 봤는데", path: "/problem/wellseen" },
            { problemId: 6, title: "자기소개", path: "/problem/introduce" },
            { problemId: 7, title: "집에 가는 길", path: "/problem/gohome" },
            { problemId: 8, title: "시간을 달려서 @kaist_puple", path: "/problem/timerun" },
          ].filter((problem) => problem.problemId <= currentProblemId);

          setHistory(problems);
        })
        .catch((error) => {
          console.error("🚨 사용자 정보 로드 오류:", error);
          navigate("/login");
        });
    } catch (error) {
      console.error("🚨 JWT 파싱 오류:", error);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">히스토리</h2>
        <div className="text-gray-700">
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li key={item.problemId} className="mb-4"> {/* 🔥 문제 간 여백 추가 */}
                  <Link
                    to={item.path}
                    className="text-xl font-semibold text-black hover:text-blue-700"
                  >
                    문제 {item.problemId}: {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>진행한 문제가 없습니다.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default History;
