import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("filter2")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
