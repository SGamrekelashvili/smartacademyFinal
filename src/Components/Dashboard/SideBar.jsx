import React from "react";
import { Menu, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "../styles";
function SideBar(props) {
  return (
    <props.Sider
      className="Sider"
      trigger={null}
      collapsible
      collapsed={props.Collapsed}
    >
      <div className="logo">
        <Typography.Title className="Title" level={5}>
          Smart Academy
        </Typography.Title>
      </div>
      <Menu
        className="menu"
        mode="inline"
        defaultSelectedKeys={[`${props.NavKey}`]}
      >
        <Menu.Item
          key="1"
          onClick={() => props.setNavKey(1)}
          icon={<HomeOutlined />}
        >
          <props.Link to="/">Home</props.Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => props.setNavKey(2)}
          icon={<HomeOutlined />}
        >
          <props.Link to="/todos">Todos</props.Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => props.setNavKey(3)}
          icon={<HomeOutlined />}
        >
          <props.Link to="/settings">Settings </props.Link>
        </Menu.Item>
      </Menu>
    </props.Sider>
  );
}

export default SideBar;
