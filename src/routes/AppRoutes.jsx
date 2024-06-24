import { Route, Routes } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout/HomeLayout";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import React from "react";
import ManagerLayout from "../pages/ManagerLayout/ManagerLayout";
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
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<ListCourt />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="yard/:yardid" element={<ViewYardDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/register" element={<Regigitster />} />
          {/* ---------------HOST ROUTES------------- */}
          <Route path="/host" element={<ManagerLayout />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
