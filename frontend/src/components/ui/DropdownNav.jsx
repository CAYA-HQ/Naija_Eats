import { Link } from "react-router-dom";

const DropdownNav = ({ toggleMobileMenu }) => {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={toggleMobileMenu}
    >
      <div
        className="absolute top-16 left-0 w-full bg-bg-background border-b border-text-primary/10 shadow-2xl py-6 px-8 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          to="/sign-up"
          className="py-3 px-4 bg-accent-orange text-white rounded-xl text-center font-bold hover:bg-orange-600 transition-colors"
          onClick={toggleMobileMenu}
        >
          Sign Up
        </Link>
        <Link
          to="/sign-in"
          className="py-3 px-4 border border-text-primary text-text-primary rounded-xl text-center font-bold hover:bg-text-primary hover:text-white transition-all"
          onClick={toggleMobileMenu}
        >
          Sign In
        </Link>
        <Link
          to="/onboarding/set-budget"
          className="py-3 px-4 text-center text-text-primary/70 font-semibold hover:text-text-primary"
          onClick={toggleMobileMenu}
        >
          Explore as Guest
        </Link>
      </div>
    </div>
  );
};

export default DropdownNav;
