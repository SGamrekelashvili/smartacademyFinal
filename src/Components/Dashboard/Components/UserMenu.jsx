import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";

const PROFILE_QUERY = gql`
  query me {
    id
    username
    email
    confirmed
    role {
      id
      type
      name
      description
    }
  }
`;

export default function UserMenu(props) {
  useEffect(() => {}, []);
  const { client, loading, data } = useQuery(PROFILE_QUERY);
  if (data) {
    console.log(data);
  }
  return (
    <div className="userMenu">
      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Hover me <DownOutlined />
        </a>
      </Dropdown>
      <button onClick={props.logout}>Log Out</button>
    </div>
  );
}

const menu = () => {
  return (
    <Menu>
      <Menu.Item key="0">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Online
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        3rd menu item（disabled）
      </Menu.Item>
    </Menu>
  );
};
