import { useState } from "react";
import {
  SearchIcon,
  HomeIcon,
  ForkAndKnife,
  ShoppingCartIcon,
  UserIcon,
} from "../constants/icons";
import { MarketData } from "../constants/market";

const Market = () => {
  const [marketData, setMarketData] = useState(MarketData);

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

  return (
    <div className="bg-bg-background min-h-screen pb-32 pt-6 px-5 flex flex-col gap-6">
      {/* Page Title */}
      <h1 className="text-4xl font-display font-extrabold text-text-primary tracking-tight">
        MARKET
      </h1>

      {/* Search Bar */}
      <div className="relative group">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/70 w-5 h-5 group-focus-within:text-accent-orange transition-colors" />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-white border border-text-muted/20 rounded-xl py-4 pl-12 pr-4 shadow-sm outline-none focus:border-accent-orange/50 transition-all text-sm"
        />
      </div>

      {/* Market Categories */}
      <div className="flex flex-col gap-8">
        {marketData.map((section, catIdx) => (
          <div key={catIdx} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{section.icon}</span>
              <h2 className="text-lg font-display font-bold text-text-primary">
                {section.category}
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  onClick={() => toggleBought(catIdx, itemIdx)}
                  className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform border border-transparent hover:border-accent-orange/10"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      item.bought
                        ? "bg-accent-orange border-accent-orange"
                        : "border-text-muted/40"
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
                          ? "text-text-muted/70 line-through"
                          : "text-text-primary"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.qty && (
                      <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                        {item.qty}
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-orange-900">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-5 right-5 z-50">
        <button className="w-full bg-accent-orange text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform">
          Mark all as bought
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-text-muted/20 flex justify-around py-3 px-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col items-center gap-1 opacity-40 cursor-pointer">
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Home
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 cursor-pointer">
          <ForkAndKnife className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Meals
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-accent-orange cursor-pointer">
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Market
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 cursor-pointer">
          <UserIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            You
          </span>
        </div>
      </div>
    </div>
  );
};

export default Market;
