import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col p-4 gap-6">
        <div className="relative rounded-xl overflow-hidden h-48 w-full shadow-lg shrink-0">
          <img
            src="/images/sign-in-hero.webp"
            alt="Nigerian Jollof Rice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white font-display text-3xl font-bold text-center leading-tight px-4">
              Heritage Flavors,
              <br />
              Modern
              <br />
              Convenience.
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-sm p-6 border border-text-muted/25 pb-8">
          <h2 className="text-3xl text-text-primary font-extrabold mb-1.5">
            Welcome Back
          </h2>
          <p className="text-text-muted text-base mb-6">
            Sign in to explore Nigeria's premium tastes.
          </p>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-inter font-bold text-text-primary uppercase tracking-wide">
                Email or Phone
              </label>
              <input
                type="text"
                placeholder="Enter your email or phone"
                className="w-full border border-text-muted/25 px-4 py-3.5 text-sm font-inter font-medium focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-bold font-inter text-text-primary uppercase">
                  Password
                </label>
                <a
                  href="#"
                  className="text-accent-orange text-sm font-inter font-semibold hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-text-muted/25 px-4 py-3.5 text-sm font-inter font-medium focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all tracking-widest placeholder:tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-4"
            >
              Sign In
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>

            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-gray-400 text-[13px] font-medium">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <Button variant="outline" className="w-full">
              Continue as Guest
            </Button>

            <div className="text-center mt-3">
              <span className="text-body text-base font-inter">
                New to NaijaEats?{" "}
              </span>
              <Link
                to="/sign-up"
                className="text-accent-orange font-semibold hover:underline text-base font-inter"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
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
    </>
  );
};

export default SignIn;
