import PageLayout from "../components/PageLayout";

const Announcement = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">공지사항</h2>
        <p className="text-gray-700">
          공지사항 내용을 여기에 작성하세요. <br/>
          업데이트 내용, 이벤트 정보 등을 포함할 수 있습니다.
        </p>
      </div>
    </PageLayout>
  );
};

export default Announcement;
