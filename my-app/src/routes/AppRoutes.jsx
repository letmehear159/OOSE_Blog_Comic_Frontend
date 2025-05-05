import React from "react";
import { Routes, Route } from "react-router-dom";
import "../index.css";
import App from "../App.jsx";
import ReviewPage from "../views/ReviewPage.jsx";
import CharacterPage from "../views/CharacterPage.jsx";
import Homepage from "../views/Homepage.jsx";
import ViewBlogPage from "../views/ViewBlogPage.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} />
      <Route path="review-truyen" element={<ReviewPage />} />
      <Route path="nhanvat" element={<CharacterPage />} />
      <Route path="view-blog" element={<ViewBlogPage />} />
    </Route>
  </Routes>
);
export default AppRoutes;
