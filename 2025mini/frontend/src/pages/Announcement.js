import PageLayout from "../components/PageLayout";

const Announcement = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold my-6">공지사항</h2>
        <p className="text-gray-700">
          추후 공지사항이 추가됩니다! <br/>
        </p>
      </div>
    </PageLayout>
  );
};

export default Announcement;
