import { Outlet } from "react-router";

const Root = () => {
  return (
    <main className="font-helvetica-cyr">
      <Outlet />
    </main>
  );
};

export default Root;
