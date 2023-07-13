import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import Footer from "@/components/Footer/Footer";

const Root = () => {
  return (
    <main className="font-helvetica-cyr">
      <TopLoadingBar />
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Root;
