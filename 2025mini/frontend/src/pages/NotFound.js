import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600 my-6">404 - 페이지를 찾을 수 없음</h2>
        <p className="text-gray-700">
          요청하신 페이지를 찾을 수 없습니다. <br/>
          아래 버튼을 눌러 메인 페이지로 이동하세요.
        </p>
        <Link to="/">
          <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md">
            메인으로 이동
          </button>
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
