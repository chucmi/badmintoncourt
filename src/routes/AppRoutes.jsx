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
import useAuth from "../services/config/provider/useAuth";
import RequireAuth from "../services/config/provider/RequireAuth";
import CourtForm from "../components/CourtForm/CourtForm";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";

export default function AppRoutes() {
  const { auth } = useAuth();

  return (
    <>
      <ScrollToTop>
        <Routes>
          {!auth?.role ? (
            <>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<ListCourt />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="yard/:yardid" element={<ViewYardDetail />} />
                <Route path="login" element={<Login />} />
                <Route path="login-success" element={<LoginSuccess />} />
                <Route path="register" element={<Register />} />
              </Route>
            </>
          ) : auth?.role === "ROLE_ADMIN" ? (
            <>
              <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
                <Route path="/" element={<ManagerLayout />}>
                  <Route index element={<PaymentHistory />} />
                </Route>
              </Route>
            </>
          ) : auth?.role === "ROLE_OWNER" ? (
            <>
              <Route element={<RequireAuth allowedRoles={["ROLE_OWNER"]} />}>
                <Route path="/" element={<ManagerLayout />}>
                  <Route index element={<CourtForm />} />
                </Route>
              </Route>
            </>
          ) : auth?.role === "ROLE_USER" ? (
            <>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<ListCourt />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="yard/:yardid" element={<ViewYardDetail />} />
                <Route path="login" element={<Login />} />
                <Route path="login-success" element={<LoginSuccess />} />
                <Route path="register" element={<Register />} />
                <Route path="transaction-history" element={<TransactionHistory />} />
              </Route>
            </>
          ) : (
            <></>
          )}

          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </ScrollToTop>
    </>
  );
}
