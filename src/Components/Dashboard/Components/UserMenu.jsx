import React from "react";
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
  const logouT = props.logout;
  const { data } = useQuery(PROFILE_QUERY);
  if (data) {
    console.log(data);
  }
  return (
    <div className="userMenu">
      <Dropdown overlay={menu(logouT)}>
        <p className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Hover me <DownOutlined />
        </p>
      </Dropdown>
    </div>
  );
}

const menu = (props) => {
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
        <button onClick={props}>Log Out</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        3rd menu item（disabled）
      </Menu.Item>
    </Menu>
  );
};
