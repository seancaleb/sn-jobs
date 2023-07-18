import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0);
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
      height={3}
      color="linear-gradient(90deg, #0d9488, #0891b2)"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default TopLoadingBar;
