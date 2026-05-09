import { Link } from "react-router-dom";
// import { HamburgerIcon } from "../constants/icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 sticky top-0 left-0 w-full bg-bg-background z-1000 lg:px-14">
      <div className="flex justify-start items-center gap-4">
        {/* <HamburgerIcon className={"text-text-primary"} /> */}
        <Link to="/" className="w-20 block">
          <img
            src="/images/naijaeats.webp"
            alt="Naija Eats Logo"
            className="w-full object-cover"
          />
        </Link>
      </div>
      <div className="w-8 h-8 rounded-full overflow-hidden bg-accent-orange/20 flex items-center justify-center">
        <img src="/images/Avatar.png" alt="Profile picture" />
      </div>
    </header>
  );
};

export default Header;
