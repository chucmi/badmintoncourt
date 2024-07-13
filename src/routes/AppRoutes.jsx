import { Route, Routes } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout/HomeLayout";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
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
import PaymentSuccess from "../components/PaymentSuccess/PaymentSuccess";
import ListOwnerCourt from "../components/ListOwnerCourt/ListOwnerCourt";
import {
  AdminMenuItems,
  OwnerMenuItems,
} from "../components/MenuItems/MenuItems";
import CourtUpdate from "../components/CourtUpdate/CourtUpdate";
import YardForm from "../components/Admin/AdminCourtManagement";
import YardList from "../components/Admin/AdminListCourt";
import UserForm from "../components/UserForm/UserForm";
import StaffList from "../components/StaffList/StaffList";
import OrderList from "../components/OrderList/OrderList";
import ListCourtSearch from "../components/ListCourtSearch/ListCourtSearch";
import PaymentError from "../components/PaymentError/PaymemtError";
import FeedbackList from "../components/FeedbackList/FeedbackList";

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
                <Route path="search/:keyword" element={<ListCourtSearch />} />
              </Route>
            </>
          ) : auth?.role === "ROLE_ADMIN" ? (
            <>
              <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
                <Route
                  path="/"
                  element={<ManagerLayout items={AdminMenuItems} />}
                >
                  <Route index element={<PaymentHistory />} />
                  {/* <Route path="court" element={<YardForm />} /> */}
                  <Route path="listcourt" element={<YardList />} />
                  <Route path="payment" element={<PaymentHistory />} />
                  <Route path="feedback" element={<FeedbackList />} />
                </Route>
              </Route>
            </>
          ) : auth?.role === "ROLE_OWNER" ? (
            <>
              <Route element={<RequireAuth allowedRoles={["ROLE_OWNER"]} />}>
                <Route
                  path="/"
                  element={<ManagerLayout items={OwnerMenuItems} />}
                >
                  <Route index element={<CourtForm />} />
                  <Route path="courts" element={<ListOwnerCourt />} />
                  <Route path="courts/:yardid" element={<CourtUpdate />} />
                  <Route path="staffs" element={<StaffList />} />
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
                <Route
                  path="transaction-history"
                  element={<TransactionHistory />}
                />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="payment-error" element={<PaymentError />} />
                <Route path="orders" element={<OrderList />} />
              </Route>
            </>
          ) : (
            <></>
          )}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
