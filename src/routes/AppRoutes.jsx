import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import React from "react";
import HostPage from "../pages/HostPage/HostPage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          {/* ---------------PUBLIC ROUTES------------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
