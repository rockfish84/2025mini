import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1])); // JWT 디코딩

        if (!decodedToken?.userId) {
          console.error("🚨 userId가 없음");
          return;
        }

        setUser(decodedToken); // 기본 정보 저장

        // 사용자 정보 가져와 currentProblemId 업데이트
        axios
          .get(`http://localhost:5000/api/user/${decodedToken.userId}`)
          .then((res) => {
            setUser((prev) => ({
              ...prev,
              currentProblemId: res.data.currentProblemId,
            }));
          })
          .catch((error) => {
            console.error("🚨 사용자 정보 로드 오류:", error);
          });
      } catch (error) {
        console.error("🚨 JWT 파싱 오류:", error);
      }
    }
  }, []);

  const handleStartGame = () => {
    if (!user) {
      console.warn("🔒 로그인 필요: 로그인 페이지로 이동");
      navigate("/login");
      return;
    }

    const problemRoutes = {
      1: "/problem/example",
      2: "/problem/even",
      3: "/problem/littlebiggerstar",
      4: "/problem/recruting",
      5: "/problem/wellseen",
      6: "/problem/introduce",
      7: "/problem/gohome",
      8: "/problem/timerun",
    };

    navigate(problemRoutes[user.currentProblemId] || "/problem/clear");
  };

  return (
    <PageLayout>
      <div className="text-center">
        <p className="text-gray-700 my-6">
          ‘2025 퍼플 동박 미궁’에 오신 여러분을 환영합니다!<br />
          ‘2025 퍼플 동박 미궁’은 KAIST Puple이 제작한 미궁 게임으로,<br />
          주어진 문제들을 해결하고 넘어가는 형식으로 되어 있습니다.<br />
          스토리와 문제를 포함한 모든 요소는 KAIST Puple에서 직접 제작되었습니다.<br />
          전형적인 미궁 게임의 문제보다 퍼즐성이 강한 문제도 일부 존재합니다.
        </p>

        <p className="text-gray-700 my-6">
          공개된 장소에서의 직접적인 힌트 제공 및 문제 스포일러를 삼가주시고,<br />
          정보 공유를 하더라도 쪽지 등 다른 사람이 알 수 없는 개인적인 방법을 이용해주시기 바랍니다.
        </p>
        <br /><br /><br />

        <h3 className="text-3xl font-bold text-purple-700 my-4">미궁 클리어 이벤트 안내</h3>
        <p className="text-gray-700 mb-6">
        <br />
          많은 분들이 즐기실 수 있도록 많은 상품을 준비해놓았습니다!<br />
          엔딩 클리어: 1등 - , 2등 - , 3,4,5등 -<br />
          이외에도 미궁을 클리어하신 모든 분들은 명예의 전당에 등재됩니다!<br />
          이벤트 참여 및 명예의 전당 등재를 원하시는 분은<br />
          <strong>kaistpuple@gmail.com</strong> 으로<br />
          히스토리 사진, 아이디와 함께 보내주세요.
        </p>

        <button
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md"
          onClick={handleStartGame}
        >
          미궁 시작하기
        </button>
      </div>
    </PageLayout>
  );
};

export default Home;
