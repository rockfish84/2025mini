import PageLayout from "../components/PageLayout";

const Ranking = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">명예의 전당</h2>
        <p className="text-gray-700">
          축하합니다! 게임을 클리어한 유저들의 순위입니다. <br/>
          - 1위: OOO (00:10:32) <br/>
          - 2위: OOO (00:12:45) <br/>
          - 3위: OOO (00:15:20) <br/>
        </p>
      </div>
    </PageLayout>
  );
};

export default Ranking;
