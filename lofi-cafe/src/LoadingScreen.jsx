import { useCafe } from "./Provider.jsx";
import BarLoader from "react-spinners/BarLoader";
import "./style/loading.scss";

function LoadingScreen() {
  const { loading } = useCafe();
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
