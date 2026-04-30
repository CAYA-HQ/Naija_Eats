import { HamburgerIcon } from "../constants/icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 sticky top-0 left-0 w-full bg-bg-background z-1000">
      <div className="flex justify-start items-center gap-4">
        <HamburgerIcon className={"text-text-primary"} />
        <img
          src="/images/naijaeats.png"
          alt="Naija Eats Logo"
          className="w-20"
        />
      </div>
      <div className="w-8 h-8 rounded-full bg-accent-orange/20 flex items-center justify-center">
        <span className="text-xs">👤</span>
      </div>
    </header>
  );
};

export default Header;
