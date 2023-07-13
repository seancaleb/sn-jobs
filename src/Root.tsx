import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import Footer from "@/components/Footer/Footer";

const Root = () => {
  return (
    <>
      <Header />
      <main className="relative font-helvetica-cyr min-h-screen container">
        <TopLoadingBar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Root;
