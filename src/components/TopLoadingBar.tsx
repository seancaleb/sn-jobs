import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      setProgress(15);
    } else if (navigation.state === "idle") {
      setProgress(100);
    }
  }, [navigation.state]);

  return <LoadingBar color="#0d9488" progress={progress} onLoaderFinished={() => setProgress(0)} />;
};

export default TopLoadingBar;
