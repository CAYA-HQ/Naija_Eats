import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="p-12 h-full flex flex-col gap-6 justify-between items-center">
      <h1 className="font-bold text-[32px] uppercase text-center">Naijaeats</h1>
      <div className="w-full max-w-xs h-full flex flex-col justify-center items-center gap-6">
        <h2 className="text-subheading font-semibold text-center">
          Stop stressing about what to cook
        </h2>
        <img
          src="/images/dish.png"
          alt="Dish picture"
          className="mx-auto w-full max-w-[120px]"
        />
        <p className="font-normal mb-6 text-base font-inter text-center">
          Get your personalized meal plans NOW
        </p>
        <Link
          to="/onboarding/set-budget"
          className="bg-accent-orange block mt-6 mx-auto text-text-primary font-semibold text-base rounded-xl py-3 px-6 text-center w-full max-w-[170px]"
        >
          Get Started
        </Link>
      </div>

      <div className="flex flex-col justify-between items-center gap-4 mt-auto">
        <p className="text-text-primary text-base text-center">
          Already have an account?
          <Link to="/sign-in" className="text-text-link">
            Sign in
          </Link>
        </p>
        <p className="text-center">Continue as Guest</p>
      </div>
    </div>
  );
};

export default WelcomePage;
