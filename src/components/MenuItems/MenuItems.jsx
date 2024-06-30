import {
  BarChartOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../../services/authAPI";
import { LogoutOutlined } from "@mui/icons-material";

const handleHome = () => {
  window.location.href = "/";
};

const handleCourtManagement = () => {
  window.location.href = "/courts";
};

const handleStaffManagement = () => {
  window.location.href = "/staffs";
};

const handleLogout = async () => {
  try {
    await logout();
    window.location.href = "/";
  } catch (error) {
    notification.error({
      message: error?.message || "Some thing wrong. Please try later!",
    });
  }
};

export const OwnerMenuItems = [
  {
    key: "1",
    icon: <AppstoreAddOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleHome();
        }}
      >
        Home
      </a>
    ),
  },
  {
    key: "2",
    icon: <BarChartOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleCourtManagement();
        }}
      >
        Court Management
      </a>
    ),
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleStaffManagement();
        }}
      >
        Staff Management
      </a>
    ),
  },
  {
    key: "4",
    icon: <LogoutOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Logout
      </a>
    ),
  },
];

// TODO:change later
export const AdminMenuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleHome();
        }}
      >
        Home
      </a>
    ),
  },
  {
    key: "2",
    icon: <LogoutOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Logout
      </a>
    ),
  },
];