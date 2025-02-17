import PageLayout from "../components/PageLayout";

const Creators = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">제작자들</h2>
        <p className="text-gray-700">
          이 게임은 다음 제작자들에 의해 만들어졌습니다. <br />
          <br />
          <br />
          
          <h3 className="text-2xl font-bold mt-6">시나리오</h3>
          <br />
          <p>양재빈 (12.5기) </p>
          <br />
          <br />

          <h3 className="text-2xl font-bold mt-6">개발</h3>
          <br />
          <p>김정훈 (13기) </p>
          <br />
          <br />

          <h3 className="text-2xl font-bold mt-6">문제 제작</h3>
          <br />
          <p>문제를 풀 때마다 제작자가 공개됩니다! :)</p>
        </p>
      </div>
    </PageLayout>
  );
};

export default Creators;
