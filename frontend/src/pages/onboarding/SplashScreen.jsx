// import React from 'react'

const SplashScreen = () => {
  return (
    <div className="bg-bg-background w-full h-screen grid place-items-center relative overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Steam Bubbles Container */}
        <div className="absolute -top-5 w-40 h-40 flex justify-center">
          <div
            className="steam-bubble w-3 h-3 bg-text-primary/20 rounded-full"
            style={{ animationDelay: "0s", left: "20%" }}
          ></div>
          <div
            className="steam-bubble w-4 h-4 bg-accent-orange/30 rounded-full"
            style={{ animationDelay: "0.7s", left: "45%" }}
          ></div>
          <div
            className="steam-bubble w-2 h-2 bg-text-link/30 rounded-full"
            style={{ animationDelay: "0.4s", left: "70%" }}
          ></div>
          <div
            className="steam-bubble w-5 h-5 bg-text-primary/10 rounded-full"
            style={{ animationDelay: "1.1s", left: "10%" }}
          ></div>
          <div
            className="steam-bubble w-3 h-3 bg-accent-orange/20 rounded-full"
            style={{ animationDelay: "1.8s", left: "80%" }}
          ></div>
          <div
            className="steam-bubble w-2.5 h-2.5 bg-text-primary/15 rounded-full"
            style={{ animationDelay: "0.3s", left: "35%" }}
          ></div>
          <div
            className="steam-bubble w-3.5 h-3.5 bg-accent-orange/25 rounded-full"
            style={{ animationDelay: "1.8s", left: "60%" }}
          ></div>
        </div>

        <img
          src="/images/naijaeats.svg"
          alt="Naija Eats Logo"
          className="w-48 h-auto drop-shadow-2xl animate-logo"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
