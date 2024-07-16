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
  StaffMenuItems,
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
import UserProfile from "../components/UserProfile/UserProfile";
import ChartPage from "../components/ChartPage/ChartPage";
import YardListStaff from "../components/YardListStaff/YardListStaff";
import YardListDetails from "../components/YardListDetails/YardListDetails";
import ChartPageAdmin from "../components/ChartPageAdmin/ChartPageAdmin";
import OwnerList from "../components/OwnerList/OwnerList";
import ListOwnerCourtAdmin from "../components/ListOwnerCourtAdmin/ListOwnerCourtAdmin";
import YardListDetailsOwner from "../components/YardListDetailsOwner/YardListDetailsOwner";
import FeedbackListYard from "../components/FeedbackListYard/FeedbackListYard";

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
                  <Route index element={<ChartPageAdmin />} />
                  {/* <Route path="court" element={<YardForm />} /> */}
                  <Route path="listcourt" element={<OwnerList />} />
                  <Route
                    path="listcourt/:hostid"
                    element={<ListOwnerCourtAdmin />}
                  />
                  <Route
                    path="payment/:yardid"
                    element={<YardListDetailsOwner />}
                  />
                  <Route path="courts/:yardid" element={<CourtUpdate />} />

                  <Route path="payment" element={<PaymentHistory />} />
                  <Route path="feedback" element={<FeedbackList />} />
                  <Route
                    path="feedback/:yardid"
                    element={<FeedbackListYard />}
                  />
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
                  <Route index element={<ChartPage />} />
                  <Route path="courts" element={<ListOwnerCourt />} />
                  <Route path="courts/new" element={<CourtForm />} />
                  <Route
                    path="courts/:yardid"
                    element={<CourtUpdate isAdmin={false} />}
                  />
                  <Route
                    path="feedback/:yardid"
                    element={<FeedbackListYard />}
                  />
                  <Route
                    path="payment/:yardid"
                    element={<YardListDetailsOwner />}
                  />
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
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </>
          ) : auth?.role === "ROLE_STAFF" ? (
            <Route path="/" element={<ManagerLayout items={StaffMenuItems} />}>
              <Route index element={<YardListStaff />} />
              <Route path="yards" element={<YardListStaff />} />
              <Route path="yards/:yardid" element={<YardListDetails />} />
            </Route>
          ) : (
            <></>
          )}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
