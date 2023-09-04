import ScrollToTop from "@/components/ScrollToTop";
import TopLoadingBar from "@/components/TopLoadingBar";
import { Toaster } from "@/components/ui/toaster";
import { useDismissToastOnRouteChange, useDocumentHeightResize } from "@/hooks";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const ApplicationRoot = () => {
  useDocumentHeightResize();
  useDismissToastOnRouteChange();

  return (
    <Fragment>
      <ScrollToTop />
      <TopLoadingBar />
      <Toaster />
      <Outlet />
    </Fragment>
  );
};

export default ApplicationRoot;
