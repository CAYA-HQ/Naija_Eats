import { Link } from "react-router-dom";
import { SearchIcon, SidebarIcon } from "../../constants/icons";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 sticky top-0 left-0 w-full bg-bg-background z-400 lg:px-8 border-b border-text-muted/5">
      <div className="flex justify-start items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-text-muted/5 hidden lg:block rounded-lg transition-colors cursor-pointer"
        >
          <SidebarIcon className="text-text-primary w-6 h-6 " />
        </button>
        <Link to="/" className="w-20 block">
          <img
            src="/images/naijaeats.webp"
            alt="Naija Eats Logo"
            className="w-full object-cover"
          />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-text-muted/5 rounded-full border border-text-muted/10 w-64">
          <SearchIcon className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            className="bg-transparent border-none outline-none text-xs w-full font-inter"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden lg:block p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer">
            <SearchIcon className="w-5 h-5 lg:hidden" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-accent-orange/20 flex items-center justify-center border-2 border-accent-orange/20 cursor-pointer">
            <img
              src="/images/Avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
