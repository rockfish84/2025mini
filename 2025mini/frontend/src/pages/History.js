import PageLayout from "../components/PageLayout";

const History = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">히스토리</h2>
        <p className="text-gray-700">
          이 게임의 과거 기록들입니다. <br/>
          - 202X년 X월 X일: 첫 번째 업데이트 <br/>
          - 202X년 X월 X일: 새로운 문제 추가 <br/>
        </p>
      </div>
    </PageLayout>
  );
};

export default History;
