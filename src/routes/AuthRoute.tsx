import { Outlet } from "react-router-dom";

const AuthRoute = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default AuthRoute;
