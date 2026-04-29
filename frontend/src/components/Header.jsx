const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-4.5 relative z-10 bg-text-primary">
      <div className="flex items-center gap-2">
        <img src="/images/naijaeats-logo.svg" alt="" />
      </div>
      <div className="w-8 h-8 rounded-full bg-accent-orange/20 flex items-center justify-center">
        <span className="text-xs">👤</span>
      </div>
    </header>
  );
};

export default Header;
