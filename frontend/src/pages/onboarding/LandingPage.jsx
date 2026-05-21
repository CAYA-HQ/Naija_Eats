import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import {
  ArrowRightIcon,
  CookIcon,
  ForkAndKnife,
  PlanIcon,
  RootsIcon,
  ShopIcon,
  ShoppingCartIcon,
} from "../../constants/icons";
import Footer from "../../components/ui/Footer";
import DropdownNav from "../../components/ui/DropdownNav";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile dropdown menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-bg-background text-text-primary flex flex-col font-inter overflow-x-hidden">
      <Header toggleSidebar={toggleMobileMenu} />

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && <DropdownNav toggleMobileMenu={toggleMobileMenu} />}

      {/* 2. Hero Section */}
      <section className="relative w-full min-h-screen md:h-162.5 flex items-center justify-center text-center pb-20 px-6 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/welcome_image.webp"
            alt="Delicious Nigerian Dish Background"
            className="w-full h-full object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-text-primary/70 via-black/50 to-black/30 z-0"></div>
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mt-auto mx-auto flex flex-col items-center gap-6 text-white animate-in fade-in zoom-in duration-700">
          <h1 className="text-3xl md:text-6xl font-display font-extrabold leading-normal max-w-3xl">
            Stop Stressing <br />
            About What to Eat
          </h1>
          <p className="text-sm md:text-lg font-inter font-light text-gray-200 max-w-xl leading-relaxed">
            Build a personalized Nigerian meal plan with flavors you love, goals
            you choose, and a rhythm that fits your lifestyle.
          </p>

          <div className="w-full max-w-xs md:max-w-md flex flex-col gap-4 mt-4">
            <Button
              to="/sign-up"
              className="w-full py-4 text-base font-bold bg-accent-orange text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] transition-all rounded-xl flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRightIcon className={"w-4 h-4"} />
            </Button>

            <Link
              to="/onboarding/set-budget"
              className="text-white hover:text-accent-orange font-bold text-sm uppercase tracking-widest mt-2 hover:underline transition-all cursor-pointer"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* 3. "Your Week in a Minute" Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl">
          <h2 className="text-[2.2rem] md:text-5xl font-display font-extrabold text-text-primary mb-4">
            Your Week in a Minute
          </h2>
          <p className="text-base text-body font-inter leading-relaxed">
            We are here to ensure you don't stress over meals weekly. We bridge
            the gap between what you want and how you can afford.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Card 1: Curated for YOU (Green background) */}
          <div className="bg-text-primary text-white rounded-3xl p-8 border border-white/5 flex flex-col gap-6 shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-accent-orange/20 text-accent-orange rounded-xl flex items-center justify-center p-2.5 self-start group-hover:scale-110 transition-transform">
              <ForkAndKnife className={"w-6 h-6"} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                Curated for YOU!
              </h3>
              <p className="text-sm font-inter text-[#bcdbb0] leading-relaxed">
                Personalized meal plans based on your very unique dietary
                preferences, health goals and even budget!
              </p>
            </div>
          </div>

          {/* Card 2: Authentic Roots (White background, Green border) */}
          <div className="bg-white text-text-primary rounded-3xl p-8 border-2 border-text-primary flex flex-col gap-6 shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-text-primary/10 text-text-primary rounded-xl flex items-center justify-center p-2.5 self-start group-hover:scale-110 transition-transform">
              <RootsIcon className={"w-6 h-6"} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-display font-bold text-text-primary tracking-tight">
                Authentic Roots
              </h3>
              <p className="text-sm font-inter text-body leading-relaxed">
                The generated plans are based on your location, ensuring that
                meals generated embellishes our{" "}
                <span className="text-text-primary font-semibold">
                  Nigerian
                </span>{" "}
                Heritage
              </p>
            </div>
          </div>

          {/* Card 3: Easy Market Planning (Green background) */}
          <div className="bg-text-primary text-white rounded-3xl p-8 border border-white/5 flex flex-col gap-6 shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-accent-orange/20 text-accent-orange rounded-xl flex items-center justify-center p-2.5 self-start group-hover:scale-110 transition-transform">
              <ShopIcon className={"w-6 h-6"} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                Easy Market Planning
              </h3>
              <p className="text-sm font-inter text-[#bcdbb0] leading-relaxed">
                The generated plans are based on your location, ensuring that
                meals generated embellishes our Nigerian Heritage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Our HERITAGE Favorites" Section */}
      <section className="bg-text-primary/5 py-16 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-text-primary/10 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-text-primary mb-2 text-center md:text-left">
                Our HERITAGE Favorites
              </h2>
              <p className="text-base text-body font-inter">
                Get a glimpse of the Nigerian Heritage.
              </p>
            </div>
            <Link
              to="/menu-page"
              className="text-accent-orange hover:text-orange-600 font-medium text-sm flex items-center gap-1 group hover:underline transition-all"
            >
              View all categories
              <ArrowRightIcon
                className={
                  "w-4 h-4 group-hover:translate-x-1 transition-transform"
                }
              />
            </Link>
          </div>

          {/* Categories Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1: Soups & Stews */}
            <div
              onClick={() => navigate("/menu-page")}
              className="relative h-62.5 rounded-3xl overflow-hidden shadow-lg cursor-pointer group hover:scale-[1.01] transition-all duration-500"
            >
              <img
                src="/images/fisherman_soup.png"
                alt="Egusi and Fisherman Soup Showcase"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-text-primary via-transparent to-transparent opacity-85 z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1 text-white">
                <h3 className="text-2xl font-display font-extrabold">
                  Soups & Stews
                </h3>
                <span className="text-xs font-inter text-[#bcdbb0]">
                  14 Recipes
                </span>
              </div>
            </div>

            {/* Category 2: Rice Dishes */}
            <div
              onClick={() => navigate("/menu-page")}
              className="relative h-62.5 rounded-3xl overflow-hidden shadow-lg cursor-pointer group hover:scale-[1.01] transition-all duration-500"
            >
              <img
                src="/images/jollof_fish_plantains.png"
                alt="Nigerian Smokey Jollof Rice"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-text-primary via-transparent to-transparent opacity-85 z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1 text-white">
                <h3 className="text-2xl font-display font-extrabold">
                  Rice Dishes
                </h3>
                <span className="text-xs font-inter text-[#bcdbb0]">
                  24 Recipes
                </span>
              </div>
            </div>

            {/* Category 3: Swallow & Sides */}
            <div
              onClick={() => navigate("/menu-page")}
              className="relative h-62.5 rounded-3xl overflow-hidden shadow-lg cursor-pointer group hover:scale-[1.01] transition-all duration-500"
            >
              <img
                src="/images/swallow_egusi.png"
                alt="Fufu/Eba with Egusi"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-text-primary via-transparent to-transparent opacity-85 z-10"></div>
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1 text-white">
                <h3 className="text-2xl font-display font-extrabold">
                  Swallow & Sides
                </h3>
                <span className="text-xs font-inter text-[#bcdbb0]">
                  18 Recipes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "The NaijaEats Journey" Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center gap-12 w-full">
        <div className="text-center max-w-xl">
          <h2 className="text-[2.2rem] md:text-5xl font-display font-extrabold text-text-primary mb-4">
            The NaijaEats Journey
          </h2>
          <p className="text-base text-body font-inter leading-relaxed">
            A simple three-step process built to guide you from kitchen
            confusion to home-cooked precision.
          </p>
        </div>

        {/* Steps Stack / Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 w-full mt-4">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-text-primary text-white rounded-2xl flex items-center justify-center p-4">
              <PlanIcon className={"w-6 h-6"} />
            </div>
            <div className="flex flex-col gap-2 max-w-xs">
              <h3 className="text-2xl font-display font-extrabold text-text-primary">
                1. Plan
              </h3>
              <p className="text-base md:text-desktop-body font-inter text-body leading-relaxed">
                Select your preferences and let us do the thinking for you
              </p>
            </div>
          </div>

          {/* Connect Arrow 1 (Desktop) */}
          <div className="hidden lg:flex items-center text-text-primary/20 self-center">
            <ArrowRightIcon className={"w-8 h-8"} />
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white text-text-primary border border-text-primary/10 rounded-2xl flex items-center justify-center p-4">
              <ShoppingCartIcon className={"w-6 h-6"} />
            </div>
            <div className="flex flex-col gap-2 max-w-xs">
              <h3 className="text-2xl font-display font-extrabold text-text-primary">
                2. Shop
              </h3>
              <p className="text-base md:text-desktop-body font-inter text-body leading-relaxed">
                A shopping list generated that organizes by assembly lines for
                easier shopping experiences.
              </p>
            </div>
          </div>

          {/* Connect Arrow 2 (Desktop) */}
          <div className="hidden lg:flex items-center text-text-primary/20 self-center">
            <ArrowRightIcon className={"w-8 h-8"} />
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-text-primary text-white rounded-2xl flex items-center justify-center p-4">
              <CookIcon className={"w-6 h-6"} />
            </div>
            <div className="flex flex-col gap-2 max-w-xs">
              <h3 className="text-2xl font-display font-extrabold text-text-primary">
                3. Cook
              </h3>
              <p className="text-base md:text-desktop-body font-inter text-body leading-relaxed">
                Retrieve your meal step, assemble your ingredients, let's get
                cooking!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. "Join Us" CTA Card */}
      <section className="py-10 px-4 md:px-12 flex justify-center items-center w-full">
        <div className="w-full max-w-4xl border-2 border-text-primary bg-white rounded-3xl p-4 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration inside */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex flex-col gap-3 text-center md:text-left max-w-lg">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-text-primary">
              Join Us
            </h2>
            <p className="text-base text-body font-inter leading-relaxed">
              Sign up once and say goodbye to mind fatigue for simple meals
            </p>
          </div>

          <Button
            to="/sign-up"
            className="w-full md:w-auto px-10 py-5 text-base font-bold bg-accent-orange text-white hover:bg-orange-600 shadow-xl hover:shadow-orange-500/20 hover:scale-[1.03] active:scale-95 transition-all rounded-xl"
          >
            Sign up now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
