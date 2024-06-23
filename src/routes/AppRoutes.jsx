import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import React from "react";
import HostPage from "../pages/HostPage/HostPage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ViewYardDetail from "../components/ViewYardDetail/ViewYardDetail";
import CartPage from "../pages/CartPage/CartPage";
import ListCourt from "../components/ListCourt/ListCourt";
import LoginSuccess from "../components/Login/LoginGoogle";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          {/* ---------------PUBLIC ROUTES------------- */}
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<ListCourt />} />
            <Route path="/paymentHistory" element={<PaymentHistory />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="yard/:yardid" element={<ViewYardDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
