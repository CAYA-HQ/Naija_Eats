import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ForkAndKnife,
  ShoppingCartIcon,
  UserIcon,
} from "../../constants/icons";
import { useFavorites } from "../../context/FavoritesContext";

const BottomTabBar = () => {
  const location = useLocation();
  const { hasUnseenFavorites } = useFavorites();

  const tabs = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Meals", icon: ForkAndKnife, path: "/menu-page" },
    { label: "Market", icon: ShoppingCartIcon, path: "/market" },
    { label: "You", icon: UserIcon, path: "/profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-4 px-6 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center gap-1 transition-all relative ${
              isActive ? "text-accent-orange" : "opacity-30 hover:opacity-100"
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.label === "You" && hasUnseenFavorites && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
