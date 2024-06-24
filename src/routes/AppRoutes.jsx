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
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../services/context/AuthContext";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ScrollToTop>
        <Routes>
          {/* ---------------PUBLIC ROUTES------------- */}
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<ListCourt />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="yard/:yardid" element={<ViewYardDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="login-success" element={<LoginSuccess />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* ---------------HOST ROUTES------------- */}
          <Route element={<PrivateRoute role="ROLE_ADMIN" />}>
            <Route path="/host" element={<ManagerLayout />} />
            <Route path="/paymentHistory" element={<PaymentHistory />} />
          </Route>
          {/* ---------------USER ROUTES------------- */}
          <Route element={<PrivateRoute role="ROLE_USER" />}></Route>
          {/* ---------------STAFF ROUTES------------- */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </AuthProvider>
  );
}
