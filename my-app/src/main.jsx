import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // Đối với AntD v5 trở lên

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
