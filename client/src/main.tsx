import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <App />
    <Toaster position="top-center" />
  </>
  // </StrictMode>
);
