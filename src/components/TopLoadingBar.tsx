import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [flag, setFlag] = useState(() => nanoid());
  const navigation = useNavigation();

  useEffect(() => {
    const bodyEl = document.querySelector("body");
    if (navigation.state === "loading") {
      bodyEl?.classList.add("disable-interactions");
      setProgress(15);
    } else if (navigation.state === "idle") {
      bodyEl?.classList.contains("disable-interactions") &&
        bodyEl?.classList.remove("disable-interactions");
      setProgress(100);
    }
  }, [navigation.state]);

  return (
    <LoadingBar
      height={2}
      color="linear-gradient(90deg, #0d9488, #0891b2)"
      progress={progress}
      onLoaderFinished={() => {
        setProgress(0);
        setFlag(nanoid());
      }}
      key={flag}
    />
  );
};

export default TopLoadingBar;
