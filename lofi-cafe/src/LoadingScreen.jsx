import { useState, useEffect } from "react";
import "./style/loading.scss";
import BarLoader from "react-spinners/BarLoader";

function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div
      className={`loading animate__animated ${
        !loading && "animate__slideOutDown"
      }`}
    >
      <span className="loading-txt">Making a coffee...</span>
      <BarLoader color="white" width={200} />
    </div>
  );
}

export default LoadingScreen;
