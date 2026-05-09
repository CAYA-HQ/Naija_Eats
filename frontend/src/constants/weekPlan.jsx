import {
  BurgerIcon,
  CoffeeIcon,
  ForkAndKnife,
  SnackIcon,
  SpagIcon,
  UtensilsIcon,
} from "./icons";

export const WeekPlan = [
  {
    day: "Sunday",
    color: "bg-green-800",
    meals: [
      {
        type: "BREAKFAST",
        name: "Bread & Egg",
        price: "₦700",
        icon: <SnackIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Jollof Rice & Grilled Fish",
        price: "₦1,600",
        icon: <BurgerIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Garri & Groundnut",
        price: "₦400",
        icon: <ForkAndKnife className="text-text-primary" />,
      },
    ],
  },
  {
    day: "Monday",
    color: "bg-orange-800",
    meals: [
      {
        type: "BREAKFAST",
        name: "Toast & Tea",
        price: "₦600",
        icon: <CoffeeIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Beans & Fried Plantain",
        price: "₦900",
        icon: <BurgerIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Indomie & Egg",
        price: "₦700",
        icon: <SpagIcon className="text-text-primary" />,
      },
    ],
  },
  {
    day: "Tuesday",
    color: "bg-green-900",
    meals: [
      {
        type: "BREAKFAST",
        name: "Pap & Akara",
        price: "₦700",
        icon: <SnackIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Simple Beef Suya & Bread",
        price: "₦1,100",
        icon: <UtensilsIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Rice & Stew",
        price: "₦650",
        icon: <ForkAndKnife className="text-text-primary" />,
      },
    ],
  },
  {
    day: "Wednesday",
    color: "bg-green-800",
    meals: [
      {
        type: "BREAKFAST",
        name: "Bread & Tea",
        price: "₦500",
        icon: <CoffeeIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Egusi & Pounded Yam",
        price: "₦1,400",
        icon: <UtensilsIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Fried Yam & Egg Sauce",
        price: "₦900",
        icon: <ForkAndKnife className="text-text-primary" />,
      },
    ],
  },
  {
    day: "Thursday",
    color: "bg-orange-900",
    meals: [
      {
        type: "BREAKFAST",
        name: "Moi Moi & Custard",
        price: "₦800",
        icon: <SnackIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Amala & Ewedu",
        price: "₦1,500",
        icon: <UtensilsIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Grilled Chicken & Fries",
        price: "₦1,800",
        icon: <BurgerIcon className="text-text-primary" />,
      },
    ],
  },
  {
    day: "Friday",
    color: "bg-green-700",
    meals: [
      {
        type: "BREAKFAST",
        name: "Akara & Ogi",
        price: "₦600",
        icon: <SnackIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Eba & Okra Soup",
        price: "₦1,300",
        icon: <UtensilsIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Suya & Cold Zobo",
        price: "₦1,200",
        icon: <ForkAndKnife className="text-text-primary" />,
      },
    ],
  },
  {
    day: "Saturday",
    color: "bg-orange-700",
    meals: [
      {
        type: "BREAKFAST",
        name: "Pancakes & Coffee",
        price: "₦1,000",
        icon: <CoffeeIcon className="text-text-primary" />,
      },
      {
        type: "LUNCH",
        name: "Native Rice & Ponmo",
        price: "₦1,100",
        icon: <BurgerIcon className="text-accent-orange" />,
      },
      {
        type: "DINNER",
        name: "Fish Pepper Soup",
        price: "₦1,500",
        icon: <SpagIcon className="text-text-primary" />,
      },
    ],
  },
];
