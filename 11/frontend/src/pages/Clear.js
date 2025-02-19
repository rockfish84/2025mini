import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const Clear = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // 토큰이 없으면 로그인 페이지 또는 홈페이지로 이동
      navigate("/");
      return;
    }
    
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      // currentProblemId가 9 미만이면 홈페이지로 이동
      if (decodedToken.currentProblemId < 9) {
        navigate("/");
      }
    } catch (error) {
      console.error("토큰 파싱 오류:", error);
      navigate("/");
    }
  }, [navigate]);

  return (
    <PageLayout>
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold my-6 text-purple-700">축하합니다!</h2>
        <p className="text-gray-700 text-xl">
          당신은 모든 문제를 클리어했습니다! 🎉
        </p>
        <p className="text-lg text-gray-600 mt-4">
          명예의 전당에 당신의 이름을 올리려면, 이메일로 히스토리 사진과 아이디를 보내주세요.
        </p>

        <div className="mt-8 text-left">
          <p className="mt-4 text-gray-700">
            퍼플이가 무사히 KAIST Puple 지원에 성공했습니다! 여러분 덕분이에요. 박수~!
          </p>
          <p className="mt-4 text-gray-700">
            지금까지 2025 KAIST Puple 동박 미궁을 즐겨주셔서 감사합니다! 본 미궁의 가장 큰 목적은..! 문제를 풀면서 카이스트 새내기분들에게 KAIST Puple이 진행한 활동, 웹사이트 등등을 소개하고 싶었어요!
          </p>
          <p className="mt-4 text-gray-700">
            KAIST Puple은 퍼즐을 사랑하는 사람들이 모인 카이스트 유일의 퍼즐 동아리입니다. 저희는 방탈출, 미궁, 물리 퍼즐 등 다양한 퍼즐을 즐기며, MT, 개강 파티, 종강 파티, 딸기 파티뿐만 아니라 부원들만의 ‘퍼플데이’와 각종 보드게임을 통한 친목활동도 진행하고 있습니다.
          </p>
          <p className="mt-4 text-gray-700">
            더 자세한 정보 및 리크루팅 안내는 홈페이지 (
            <a
              href="https://kaistpuple.com/main/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              kaistpuple.com/main/
            </a>
            )와 인스타그램 (
            <a
              href="https://instagram.com/kaist_puple"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @kaist_puple
            </a>
            )을 참고해주세요.
          </p>
          <p className="mt-4 text-gray-700">
            다음에 동아리 정모에서 만나요! 안녕!
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Clear;
