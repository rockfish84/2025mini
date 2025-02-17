import PageLayout from "../components/PageLayout";

const Clear = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-4xl font-bold my-6 text-purple-700">축하합니다!</h2>
        <p className="text-gray-700">
          당신은 모든 문제를 클리어했습니다! 🎉
        </p>
        <p className="text-lg text-gray-600 mt-4">
          명예의 전당에 당신의 이름을 올리려면, 이메일로 히스토리 사진과 아이디를 보내주세요.
        </p>
      </div>
    </PageLayout>
  );
};

export default Clear;
