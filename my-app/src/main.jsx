import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Homepage from "./views/Homepage";
import ReviewPage from "./views/ReviewPage";
import CharacterPage from "./views/CharacterPage";
import "antd/dist/reset.css"; // Đối với AntD v5 trở lên
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="character" element={<CharacterPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
