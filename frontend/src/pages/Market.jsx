import { useState } from "react";
import { SearchIcon, ShoppingCartIcon } from "../constants/icons";
import { MarketData } from "../constants/market";

const Market = () => {
  const [marketData, setMarketData] = useState(MarketData);
  const [activeFilter, setActiveFilter] = useState("Today's Meals");

  const toggleBought = (catIdx, itemIdx) => {
    setMarketData((prevData) =>
      prevData.map((category, cIdx) => {
        if (cIdx !== catIdx) return category;

        return {
          ...category,
          items: category.items.map((item, iIdx) => {
            if (iIdx !== itemIdx) return item;
            return { ...item, bought: !item.bought };
          }),
        };
      }),
    );
  };

  const filters = ["Today's Meals", "This Week's Meals", "All"];

  return (
    <main className="px-5 pt-6 flex flex-col gap-6">
      <h1 className="text-[2.5rem] font-display font-extrabold text-[#244421] leading-none">
        MARKET
      </h1>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === filter
                ? "bg-[#FF7A1A] text-white shadow-lg shadow-orange-200"
                : "bg-black/5 text-text-muted hover:bg-black/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 shadow-sm outline-none placeholder:text-gray-400 text-sm"
        />
      </div>

      {/* Featured Card: Today's Meal */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-display font-extrabold text-[#244421]">
            Today's Meal
          </h2>
          <button className="text-[#FF7A1A] text-xs font-bold flex items-center gap-1 hover:underline">
            Swap Meal
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m21 2-5 5m-11 5 5 5m0-10 8 8" />
            </svg>
          </button>
        </div>

        <div className="bg-[#244421] rounded-3xl p-5 text-white flex flex-col gap-4 shadow-xl">
          <div className="flex gap-4">
            <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-white/10">
              <img
                src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=400"
                alt="Jollof Rice"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Lunch
                </span>
                <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Served 1
                </span>
              </div>
              <h3 className="text-xl font-display font-bold leading-tight mt-1">
                Jollof Rice & Grilled Fish
              </h3>
              <p className="text-[10px] text-white/70 leading-relaxed line-clamp-3 font-medium">
                A spicy, aromatic classic paired with ocean-fresh tilapia,
                slow-grilled with herb butter.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/50">
              Ingredients Needed:
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {["Rice", "Chicken", "Peppers", "Spices"].map((ing) => (
                <div key={ing} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#FF7A1A]" />
                  <span className="text-[11px] font-medium text-white/90">
                    {ing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-[#FF7A1A] hover:bg-[#e66a13] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors">
            <ShoppingCartIcon className="w-4 h-4" />
            Add All to Cart
          </button>
        </div>
      </section>

      {/* Market Categories */}
      <div className="flex flex-col gap-8">
        {marketData.map((section, catIdx) => (
          <div key={catIdx} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 opacity-80">
              <span className="text-xl grayscale-[0.5]">{section.icon}</span>
              <h2 className="text-lg font-display font-bold text-[#244421]">
                {section.category}
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  onClick={() => toggleBought(catIdx, itemIdx)}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.98] transition-all border border-transparent"
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      item.bought
                        ? "bg-[#FF7A1A] border-[#FF7A1A]"
                        : "border-gray-200"
                    }`}
                  >
                    {item.bought && (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4L4.5 7.5L11 1"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span
                      className={`text-sm font-bold ${
                        item.bought
                          ? "text-gray-300 line-through"
                          : "text-[#244421]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.qty && (
                      <span className="bg-[#F8F8DF] text-[#244421] text-[10px] font-bold px-3 py-1 rounded-lg border border-[#244421]/10">
                        {item.qty}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button Placeholder - Usually better to keep this in the layout or relative to main if it needs to float over the BottomTabBar */}
      <div className="fixed bottom-24 left-5 right-5 z-50">
        <button className="bg-[#FF7A1A] text-white w-full rounded-2xl h-14 text-sm font-bold shadow-xl shadow-orange-200 hover:bg-[#e66a13] transition-colors">
          Mark all as bought
        </button>
      </div>
    </main>
  );
};

export default Market;
