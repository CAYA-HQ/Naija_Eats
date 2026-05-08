import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="px-5 pt-8 flex flex-col gap-8">
      {/* Greeting */}
      <section>
        <h1 className="text-4xl font-display font-extrabold text-text-primary tracking-tight">
          Hi, John Doe!
        </h1>
      </section>

      {/* Weekly Plan Progress */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-display font-bold text-text-primary">
            This Week's Plan
          </h2>
          <Link
            to="/weekly-plan"
            className="text-[#FF7A1A] text-xs font-bold italic hover:underline"
          >
            Edit Plan
          </Link>
        </div>

        <div className="bg-[#344454] rounded-2xl p-5 text-white flex flex-col gap-3 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <span className="text-sm font-bold opacity-90">₦8000/10000</span>
          </div>

          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden z-10">
            <div className="h-full bg-[#5C8C4C] w-[80%] rounded-full shadow-[0_0_10px_rgba(92,140,76,0.5)]"></div>
          </div>

          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-medium opacity-60">
              ₦2000 remaining
            </span>
          </div>
        </div>
      </section>

      {/* Today's Meals Highlight */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-display font-bold text-text-primary">
          Today's Meals
        </h2>

        <div className="bg-text-primary rounded-md overflow-hidden shadow-xl">
          <div className="relative h-60">
            <img
              src="/images/jollof_fish_plantains.png"
              alt="Today's Meal"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full shadow-md">
              <span className="text-xs font-bold text-accent-orange uppercase tracking-widest">
                Lunch
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-display font-bold text-white">
                Jollof Rice & Grilled Fish
              </h3>
              <div className="flex items-center gap-3 text-white/70 text-xs font-medium">
                <span className="flex items-center gap-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  45 mins
                </span>
                <span className="font-bold text-white">₦2,800</span>
              </div>
            </div>

            <button className="bg-accent-orange hover:bg-accent-orange text-white py-4 rounded-xs font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
              Start Cooking
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Meals */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display font-bold text-text-primary">
            Upcoming Meals
          </h2>
          <button className="text-text-primary text-xs font-bold hover:opacity-70">
            See Calendar
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              time: "DINNER • TONIGHT",
              name: "Swallow and Egusi",
              duration: "30 mins",
              price: "₦3,200",
              img: "/images/swallow_egusi.png",
            },
            {
              time: "BREAKFAST • TOMORROW",
              name: "Toast and Tea",
              duration: "20 mins",
              price: "₦1,500",
              img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=200",
            },
          ].map((meal, i) => (
            <div
              key={i}
              className="bg-white rounded-4xl p-4 flex items-center gap-4 shadow-sm border border-black/5"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={meal.img}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-[#FF7A1A] tracking-wider uppercase">
                  {meal.time}
                </span>
                <h4 className="text-sm font-bold text-text-primary">
                  {meal.name}
                </h4>
                <span className="text-[10px] font-medium text-gray-400">
                  {meal.duration} •{" "}
                  <span className="font-bold text-gray-600">{meal.price}</span>
                </span>
              </div>
              <button className="p-2 text-gray-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
