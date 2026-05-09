import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { ForkAndKnife } from "../../constants/icons";

const WelcomePage = () => {
  return (
    <>
      {/* mobile view */}
      <div className="py-12 lg:hidden relative px-4 h-full flex flex-col gap-6 items-center">
        <img
          src="/images/naijaeats.webp"
          alt="Naija Eats Logo"
          className="w-40"
        />
        <div className="w-full max-w-xs mb-auto h-full flex flex-col justify-center items-center gap-6">
          <h2 className="text-subheading text-text-primary tracking-tight leading-10 font-bold text-center pb-2">
            Stop stressing about what to cook
          </h2>
          <div className="grid grid-cols-6 grid-rows-2 gap-3 w-full h-50">
            <div className="col-span-4 row-span-2">
              <img
                src="/images/nigerian-jollof-rice.webp"
                alt="Nigerian Jollof rice"
                className="w-full h-full object-fill rounded-[4px]"
              />
            </div>
            <div className="col-start-5 col-end-7 row-start-1 row-end-2">
              <img
                src="/images/ingredients.webp"
                alt="Ingredients"
                className="w-full h-full object-cover rounded-[4px]"
              />
            </div>

            <div className="bg-text-primary rounded-[4px] col-start-5 col-end-7 row-start-2">
              <ForkAndKnife className={"w-full h-full"} />
            </div>
          </div>
          <p className="font-normal mb-6 text-base font-inter text-center">
            Master your kitchen with personalized meal planning and smart
            budgeting tailored to your local market prices.
          </p>
          <Button to="/onboarding/set-budget" className="w-full max-w-[320px]">
            Get Started
          </Button>
        </div>

        <div className="flex flex-col justify-between items-center gap-4 mt-auto">
          <p className="text-text-muted/75 text-base text-center">
            Already have an account?
          </p>
          <Link
            to="/sign-in"
            className="text-accent-orange font-semibold underline underline-offset-10"
          >
            Sign in
          </Link>
          <Link
            to="/onboarding/set-budget"
            className="hover:underline hover:underline-offset-5"
          >
            Continue as Guest
          </Link>
        </div>
      </div>

      {/* desktop view  */}
      <div className="py-15 hidden lg:grid relative px-6 h-full grid-cols-[569px_1fr] gap-6 place-items-center">
        <img
          src="/images/naijaeats.webp"
          alt="Naija Eats Logo"
          className="w-25 absolute top-6 left-8"
        />
        <div>
          <div className="w-auto mb-auto h-full flex flex-col justify-center items-center gap-6">
            <h2 className="text-5xl text-text-primary tracking-tight leading-20 font-bold text-left pb-2">
              Stop stressing about what to cook
            </h2>

            <p className="font-normal mb-2 text-desktop-body font-inter text-left">
              Master your kitchen with personalized meal planning and smart
              budgeting tailored to your local market prices.
            </p>
            <Button
              to="/onboarding/set-budget"
              className="w-full max-w-[280px] mr-auto"
            >
              Get Started
            </Button>
          </div>

          <div className=" hidden lg:flex justify-start items-center gap-4 mt-4 mr-auto">
            <p className="text-text-muted/75 text-base text-left">
              Already have an account?
            </p>
            <Link
              to="/sign-in"
              className="text-accent-orange font-semibold underline underline-offset-10"
            >
              Sign in
            </Link>
          </div>
          <Link
            to="/onboarding/set-budget"
            className="hover:underline hover:underline-offset-5"
          >
            Continue as Guest
          </Link>
        </div>

        <div className="grid grid-cols-6 grid-rows-2 gap-3 w-full h-full">
          <div className="col-span-4 row-span-2">
            <img
              src="/images/nigerian-jollof-rice.webp"
              alt="Nigerian Jollof rice"
              className="w-full h-full object-fill rounded-[4px]"
            />
          </div>
          <div className="col-start-5 col-end-7 row-start-1 row-end-2">
            <img
              src="/images/ingredients.webp"
              alt="Ingredients"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>

          <div className="bg-text-primary rounded-[4px] col-start-5 col-end-7 row-start-2"></div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
