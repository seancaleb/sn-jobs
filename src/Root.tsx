import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const Root = () => {
  return (
    <>
      <Header />
      <main className="relative min-h-screen container">
        <TopLoadingBar />
        <Toaster />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Root;
