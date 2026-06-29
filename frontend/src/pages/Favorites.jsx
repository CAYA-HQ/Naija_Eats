import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClockIcon, MealCardHeartIcon, MealArrowIcon, ChevronRightIcon } from "../constants/icons";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, toggleFavorite, markFavoritesAsSeen } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    markFavoritesAsSeen();
  }, [markFavoritesAsSeen]);

  return (
    <main className="px-5 pt-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronRightIcon className="w-6 h-6 rotate-180 text-text-primary" />
        </button>
        <h1 className="text-3xl font-display font-extrabold text-text-primary leading-tight">
          Favourite Meals
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-3xl">
            💔
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            No favorites yet
          </h3>
          <p className="text-sm text-text-muted max-w-xs">
            Start liking meals from the menu to see them here!
          </p>
          <button
            onClick={() => navigate("/menu-page")}
            className="mt-4 bg-text-primary text-white px-6 py-3 rounded-full font-bold text-sm"
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {favorites.map((meal) => (
            <div
              key={meal.id}
              className="bg-text-primary rounded-md overflow-hidden shadow-xl flex flex-col h-full max-h-[420px]"
            >
              <div className="relative h-[50%] overflow-hidden">
                <img
                  src={meal.img || meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                {meal.category && (
                  <div className="absolute top-4 left-4 bg-accent-orange/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                      {meal.category}
                    </span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(meal);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform"
                >
                  <MealCardHeartIcon className="text-accent-orange" filled={true} />
                </button>
                {(meal.duration || meal.time) && (
                  <div className="absolute bottom-4 left-4 bg-text-primary/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <ClockIcon className="text-white" />
                    <span className="text-[10px] font-bold text-white uppercase">
                      {meal.duration || meal.time}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 h-[50%] flex flex-col justify-between items-start gap-3">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-xl font-display font-bold text-white max-w-[65%] leading-tight">
                    {meal.name}
                  </h3>
                  <span className="text-xs font-bold text-white/80 text-right max-w-[35%]">
                    {meal.price || meal.cost}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium line-clamp-2">
                  {meal.description || "A delicious Nigerian meal."}
                </p>
                <button
                  className="bg-accent-orange hover:bg-accent-orange/75 text-white py-3.5 rounded-xs font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 w-full"
                  onClick={() => navigate(`/meal/${meal.slug || meal.id}`)}
                >
                  View Meal
                  <MealArrowIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Favorites;
