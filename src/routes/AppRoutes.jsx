import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import React from "react";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          {/* ---------------PUBLIC ROUTES------------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
