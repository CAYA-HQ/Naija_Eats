import { Navigate, Outlet } from "react-router-dom";

export const RequireOnboarding = () => {
  const onboarded = localStorage.getItem("onboarded");
  if (!onboarded) {
    return <Navigate to={"/onboarding/welcome"} />;
  }
  return <Outlet />;
};
