/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorite_meals");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  });

  const [hasUnseenFavorites, setHasUnseenFavorites] = useState(() => {
    try {
      const unseen = localStorage.getItem("unseen_favorites");
      return unseen ? JSON.parse(unseen) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  // Save to local storage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem("favorite_meals", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "unseen_favorites",
        JSON.stringify(hasUnseenFavorites),
      );
    } catch (error) {
      console.error("Failed to save unseen favorites state:", error);
    }
  }, [hasUnseenFavorites]);

  const markFavoritesAsSeen = useCallback(() => {
    setHasUnseenFavorites(false);
  }, []);

  const addFavorite = (meal) => {
    setFavorites((prev) => {
      if (!prev.find((m) => m.id === meal.id)) {
        toast.success(`${meal.name} added to favourite meals`);
        setHasUnseenFavorites(true);
        return [...prev, meal];
      }
      return prev;
    });
  };

  const removeFavorite = (mealId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== mealId));
  };

  const toggleFavorite = (meal) => {
    if (isFavorite(meal.id)) {
      removeFavorite(meal.id);
      toast.info(`${meal.name} removed from favourite meals`);
    } else {
      addFavorite(meal);
    }
  };

  const isFavorite = (mealId) => {
    return favorites.some((m) => m.id === mealId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        hasUnseenFavorites,
        markFavoritesAsSeen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
