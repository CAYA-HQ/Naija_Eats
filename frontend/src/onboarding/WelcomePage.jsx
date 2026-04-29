import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="py-12 px-4 h-full flex flex-col gap-6 justify-between items-center">
      <h1 className="font-bold text-[32px] uppercase text-center">Naijaeats</h1>
      <div className="w-full max-w-xs h-full flex flex-col justify-center items-center gap-6">
        <h2 className="text-subheading font-bold text-center pb-2">
          Stop stressing about what to cook
        </h2>
        <div className="grid grid-cols-6 grid-rows-2 gap-3 w-full h-50">
          <div className="col-span-4 row-span-2">
            <img
              src="/images/nigerian-jollof-rice.png"
              alt="Nigerian Jollof rice"
              className="w-full h-full object-fill rounded-[4px]"
            />
          </div>
          <div className="col-start-5 col-end-7 row-start-1 row-end-2">
            <img
              src="/images/ingredients.png"
              alt="Ingredients"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>

          <div className="bg-text-primary rounded-[4px] col-start-5 col-end-7 row-start-2"></div>
        </div>
        <p className="font-normal mb-6 text-base font-inter text-center">
          Master your kitchen with personalized meal planning and smart
          budgeting tailored to your local market prices.
        </p>
        <Link
          to="/onboarding/set-budget"
          className="bg-accent-orange block mx-auto text-bg-background font-semibold text-base rounded-xl py-3 px-6 text-center w-full max-w-[320px]"
        >
          Get Started
        </Link>
      </div>

      <div className="flex flex-col justify-between items-center gap-4 mt-auto">
        <p className="text-text-primary text-base text-center">
          Already have an account?
        </p>
        <Link
          to="/sign-in"
          className="text-text-link font-semibold underline underline-offset-10"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
