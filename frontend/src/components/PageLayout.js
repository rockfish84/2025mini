import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default PageLayout;
