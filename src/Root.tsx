import { Outlet } from "react-router";
import Header from "@/components/Header";
import TopLoadingBar from "@/components/TopLoadingBar";

const Root = () => {
  return (
    <main className="font-helvetica-cyr">
      <TopLoadingBar />
      <Header />
      <Outlet />
    </main>
  );
};

export default Root;
