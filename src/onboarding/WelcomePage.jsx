import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="p-12 flex flex-col justify-between items-center">
      <h1 className="font-bold text-[32px] uppercase text-center">Naijaeats</h1>
      <div className="w-full max-w-xs h-full flex-1 flex-col justify-center items-center gap-4">
        <h2 className="text-subheading font-semibold text-center">
          Stop stressing about what to cook
        </h2>
        <img
          src="/images/dish.png"
          alt="Dish picture"
          className="mx-auto w-full"
        />
        <p className="font-normal text-base font-inter text-center">
          Get your personalized meal plans NOW
        </p>
      </div>
      <div className="flex-col justify-between items-center gap-8">
        <p className="text-text-primary text-base">
          Already have an account?
          <Link to="/sign-in" className="text-text-link">
            Sign in
          </Link>
        </p>
        <p className="">Continue as Guest</p>
      </div>
    </div>
  );
};

export default WelcomePage;
