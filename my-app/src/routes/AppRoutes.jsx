import React from "react";
import { Routes, Route } from "react-router-dom";
import "../index.css";
import App from "../App.jsx";
import Homepage from "../views/Homepage";
import ReviewPage from "../views/ReviewPage";
import CharacterPage from "../views/CharacterPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} />
      <Route path="review" element={<ReviewPage />} />
      <Route path="character" element={<CharacterPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
