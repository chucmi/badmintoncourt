import React from "react";
import PropTypes from "prop-types";
import { Avatar, Space } from "antd";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import {
  DownOutlined,
  UserOutlined,
  SettingTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";

function Header({
  backgroundColor = "white",
  padding = 0,
  avatarSize = 42,
  username = "Unknow",
  userIcon = <UserOutlined />,
  extraIcons = [
    <QuestionCircleTwoTone className="text-2xl p-1" />,
    <SettingTwoTone className="text-2xl p-1" />,
  ],
}) {
  return (
    <HeaderAntd style={{ padding, background: backgroundColor }}>
      <Space className="flex justify-end items-center pr-6">
        {extraIcons.map((icon, index) => (
          <React.Fragment key={index}>{icon}</React.Fragment>
        ))}
        <div className="flex items-center font-semibold">
          <Avatar size={avatarSize} className="ml-4 mr-5" icon={userIcon} />
          {username}
          <DownOutlined className="text-xl ml-5" />
        </div>
      </Space>
    </HeaderAntd>
  );
}

Header.propTypes = {
  backgroundColor: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  avatarSize: PropTypes.number,
  username: PropTypes.string,
  userIcon: PropTypes.element,
  extraIcons: PropTypes.arrayOf(PropTypes.element),
};

export default Header;
