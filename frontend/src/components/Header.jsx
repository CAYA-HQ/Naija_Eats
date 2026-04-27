import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative top-0 left-0 mt-8 flex justify-center items-center gap-10">
      <span
        className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer active:scale-95 transition-transform"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit={10}
            strokeWidth={32}
            d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
          ></path>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="m296 352l-96-96l96-96"
          ></path>
        </svg>
      </span>{" "}
      <h1 className="text-[32px] font-bold uppercase">NaijaEats</h1>
    </div>
  );
};

export default Header;
