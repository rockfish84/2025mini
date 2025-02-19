import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import axios from "axios";

const Creators = () => {
  const [user, setUser] = useState(null);
  const [problemInfos, setProblemInfos] = useState([]);

  // 문제 정보 배열 (problemId 오름차순)
  const problemCreators = [
    { problemId: 1, info: "복면산? - 김예환 (13기)" },
    { problemId: 2, info: "이븐한 식사 - 나인석 (12기)" },
    { problemId: 3, info: "Little Bigger Star - 나인석 (12기)" },
    { problemId: 4, info: "리크루팅 대모험 - 김정훈 (13기)" },
    { problemId: 5, info: "이거 어디서 많이 봤는데 - 양재빈 (12기)" },
    { problemId: 6, info: "자기소개 - 양재빈 (12기)" },
    { problemId: 7, info: "집에 가는 길 - 김정훈 (13기)" },
    { problemId: 8, info: "시간을 달려서 @kaist_puple - 김정훈 (13기)" },
  ];

  useEffect(() => {
    // 토큰에서 userId를 가져오거나,
    // localStorage에서 user 정보를 로드하거나,
    // 혹은 이미 상위에서 user를 props로 넘겨받았다면 그걸 사용 가능
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    try {
      const decoded = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(decoded);
    } catch (err) {
      console.error("JWT decode error:", err);
    }
  }, []);

  useEffect(() => {
    // user가 있을 때 currentProblemId를 가져오기 위해 API 호출
    // or 유저 정보에 currentProblemId가 JWT에 포함되어 있으면 그대로 사용
    if (user?.userId) {
      // 유저 정보 API 호출해서 currentProblemId 가져오기 (예시)
      axios
        .get(`http://localhost:5000/api/user/${user.userId}`)
        .then((res) => {
          const { currentProblemId } = res.data;
          // currentProblemId까지만 필터
          const filtered = problemCreators.filter(
            (pc) => pc.problemId <= currentProblemId
          );
          setProblemInfos(filtered);
        })
        .catch((err) => console.error("사용자 정보 로드 오류:", err));
    }
  }, [user]);

  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">제작자들</h2>
        <p className="text-gray-700">
          <br />
          <h3 className="text-2xl font-bold mt-6">기획</h3>
          <br />
          <p>김예환 (13기) 김정훈 (13기) 양재빈 (12기) 황성태 (13기)</p>
          <br />
          <br />
          <h3 className="text-2xl font-bold mt-6">시나리오</h3>
          <br />
          <p>양재빈 (12기)</p>
          <br />
          <br />

          <h3 className="text-2xl font-bold mt-6">개발</h3>
          <br />
          <p>김정훈 (13기)</p>
          <br />
          <br />

          <h3 className="text-2xl font-bold mt-6">문제 제작</h3>
          <br />
          <p>문제를 풀 때마다 제작자가 공개됩니다! :)</p>
        </p>

        {/* 🔥 동적으로 표시되는 문제 제작자 목록 */}
        <div className="mt-6">
          {problemInfos.map((pc) => (
            <p key={pc.problemId}>{pc.info}</p>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Creators;
