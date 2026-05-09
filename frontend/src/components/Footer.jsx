const Footer = () => {
  return (
    <footer className="py-6 flex flex-col items-center gap-4 text-sm text-gray-500 mt-auto px-4">
      <div className="flex gap-2">
        <a
          href="#"
          className="text-sm hover:text-text-primary transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-sm hover:text-text-primary transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="text-sm hover:text-text-primary transition-colors"
        >
          Help Center
        </a>
      </div>
      <p className="text-center text-xs text-gray-400">
        © 2026 NaijaEats Corporate. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
