import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import CustomCheckbox from "../../components/CustomCheckbox";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleTerms = () => {};

  return (
    <>
      <Header />

      <main className="flex-1 flex flex-col p-4 justify-center py-6">
        <div className="bg-white rounded-sm p-6  border border-text-muted/25">
          <h1 className="font-display text-[2.2rem] text-text-primary font-extrabold mb-2 text-center tracking-tight">
            Join the Feast
          </h1>
          <p className="text-text-muted text-center text-base mb-8 px-2 leading-relaxed font-inter">
            Join us now and say good bye to food making decision paralysis!
          </p>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-base font-inter font-bold text-text-primary">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="border border-text-muted/25 font-inter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-inter font-bold text-text-primary">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="border border-text-muted/25 font-inter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-inter font-bold text-text-primary">
                Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="+234"
                  readOnly
                  className="w-[72px] border border-text-muted/25 font-inter bg-gray-50 rounded-lg px-2 py-3 text-sm text-center font-medium focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="8012345678"
                  className="flex-1 border border-text-muted/25 font-inter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-bold font-inter text-text-primary">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full border border-text-muted/25 font-inter rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all"
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

            <div className="flex items-start justify-start gap-3 mt-2">
              <button onClick={handleToggleTerms}>
                <CustomCheckbox checked={handleToggleTerms} />
              </button>
              <label
                htmlFor="terms"
                className="text-xs text-text-primary leading-tight"
              >
                By signing up, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="button"
              className="bg-accent-orange hover:bg-orange-600 text-white font-semibold font-inter py-3 rounded-lg flex justify-center items-center gap-2 transition-all mt-4 text-base"
            >
              Create Account
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
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-text-muted/30 flex-1"></div>
              <span className="text-text-muted/40 text-[13px] font-medium">
                OR
              </span>
              <div className="h-px bg-text-muted/30 flex-1"></div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 border-2 border-text-primary text-text-primary font-bold py-3 rounded-lg hover:bg-gray-50 transition-all flex justify-center items-center text-base font-inter"
              >
                Google
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-text-primary text-text-primary font-bold py-3 rounded-lg hover:bg-gray-50 transition-all flex justify-center items-center text-base"
              >
                Apple
              </button>
            </div>

            <div className="text-center mt-3">
              <span className="text-text-muted text-base">
                Already have an account?{" "}
              </span>
              <Link
                to="/sign-in"
                className="text-accent-orange font-bold hover:underline text-base"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center gap-4 text-[13px] text-gray-500 px-4 bg-[#ececd6] mt-auto">
        <div className="flex gap-6 font-medium">
          <a href="#" className="hover:text-text-link transition-colors">
            Help Center
          </a>
          <a href="#" className="hover:text-text-link transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-text-link transition-colors">
            Terms
          </a>
          <span className="text-gray-400">© 2026 NaijaEats</span>
        </div>
      </footer>
    </>
  );
};

export default SignUp;
