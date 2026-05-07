import Header from "./Header";
import BottomTabBar from "./BottomTabBar";

const HomePageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8DF]">
      <Header />
      <div className="flex-1 pb-32">
        {children}
      </div>
      <BottomTabBar />
    </div>
  );
};

export default HomePageLayout;
