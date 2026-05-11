import { useState } from "react";
import Header from "../ui/Header";
import BottomTabBar from "../ui/BottomTabBar";
import Sidebar from "../ui/Sidebar";

const HomePageLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8DF]">
      <Header toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />
      <div className="flex flex-1 min-w-0">
        <Sidebar
          isExpanded={isSidebarExpanded}
          setIsExpanded={setIsSidebarExpanded}
        />
        <main className="flex-1 pb-32 lg:pb-12 overflow-x-hidden">
          {children}
        </main>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default HomePageLayout;
