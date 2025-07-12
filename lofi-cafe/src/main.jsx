import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CafeProvider } from "./Provider.jsx";
import "./style/index.css";
import "./style/phone.scss";
import "./style/audioPlayer.scss";
import "./style/loading.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CafeProvider>
      <App />
    </CafeProvider>
  </StrictMode>
);
