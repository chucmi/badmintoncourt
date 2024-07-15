import {
  BarChartOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../../services/authAPI";
import {
  ListAltOutlined,
  LogoutOutlined,
  ReportGmailerrorred,
  ReportOffOutlined,
  StackedBarChartOutlined,
} from "@mui/icons-material";

const handleHome = () => {
  window.location.href = "/";
};

const handleCourtManagement = () => {
  window.location.href = "/courts";
};

const handleStaffManagement = () => {
  window.location.href = "/staffs";
};

const handleFeedback = () => {
  window.location.href = "/feedback";
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

const handleAdminCourt = () => {
  window.location.href = "/court";
};

const handleAdminListCourt = () => {
  window.location.href = "/listcourt";
};

const handleAdminPayment = () => {
  window.location.href = "/payment";
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

export const StaffMenuItems = [
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
          handleStaffYards();
        }}
      >
        Yards
      </a>
    ),
  },
  {
    key: "3",
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

const handleStaffYards = () => {
  window.location.href = "/yards";
};

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
  // {
  //   key: "2",
  //   icon: <BarChartOutlined />,
  //   label: (
  //     <a
  //       onClick={(e) => {
  //         e.preventDefault();
  //         handleAdminCourt();
  //       }}
  //     >
  //       Court Management
  //     </a>
  //   ),
  // },
  {
    key: "3",
    icon: <ListAltOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleAdminListCourt();
        }}
      >
        List Court
      </a>
    ),
  },
  {
    key: "4",
    icon: <BarChartOutlined />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleAdminPayment();
        }}
      >
        Payment
      </a>
    ),
  },
  {
    key: "5",
    icon: <ReportGmailerrorred />,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleFeedback();
        }}
      >
        Feedbacks
      </a>
    ),
  },
  {
    key: "6",
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
