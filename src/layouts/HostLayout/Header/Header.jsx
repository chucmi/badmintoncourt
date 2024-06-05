import { Avatar, Space } from "antd";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import {
  DownOutlined,
  UserOutlined,
  SettingTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";

function Header() {
  return (
    <>
      <HeaderAntd
        style={{
          padding: 0,
          background: "white",
        }}
      >
        <Space className="flex justify-end items-center pr-6">
          <QuestionCircleTwoTone className="flex text-2xl p-1" />
          <SettingTwoTone className="flex text-2xl p-1" />
          <div className="flex items-center font-semibold ">
            <Avatar size={42} className="ml-4 mr-5" icon={<UserOutlined />} />
            Host
            <DownOutlined className="text-xl ml-5" />
          </div>
        </Space>
      </HeaderAntd>
    </>
  );
}

export default Header;
