import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* icon */}
      <div className="w-24 h-24 rounded-full bg-accent-orange/10 flex items-center justify-center mb-6">
        <span className="text-5xl">🍲</span>
      </div>

      {/* heading */}
      <h1 className="text-3xl font-display font-bold text-text-primary leading-tight mb-3">
        Monthly Planning
        <br />
        Coming Soon
      </h1>

      {/* sub */}
      <p className="text-sm text-body font-inter max-w-xs mb-2">
        We're cooking something big. Monthly meal planning with batch-friendly
        meals and weekend session grouping is on the way.
      </p>

      {/* badge */}
      <span className="inline-block bg-accent-orange/10 text-accent-orange text-xs font-bold px-3 py-1 rounded-full mb-8 uppercase tracking-wider">
        In Development
      </span>

      {/* what's coming */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-black/5 shadow-sm p-5 mb-8 text-left">
        <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
          What to expect
        </p>
        <ul className="space-y-3">
          {[
            "📅  Full 4-week meal calendar",
            "🛒  One bulk shopping list for the month",
            "🍱  Batch-cook friendly meal selection",
            "💰  Monthly budget tracking & alerts",
          ].map((item) => (
            <li
              key={item}
              className="text-sm font-inter text-text-primary flex items-start gap-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* cta */}
      <button
        onClick={() => navigate("/onboarding/set-budget")}
        className="w-full max-w-sm bg-text-primary text-white font-bold text-sm py-4 rounded-xl mb-3 cursor-pointer"
      >
        Switch to Weekly Planning
      </button>
      <button
        onClick={() => navigate("/")}
        className="text-sm text-body font-inter hover:text-text-primary transition-colors"
      >
        Go back home
      </button>
    </div>
  );
};

export default ComingSoon;
