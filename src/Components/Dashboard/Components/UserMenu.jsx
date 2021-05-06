import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";

const PROFILE_QUERY = gql`
  query me {
    me {
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
  }
`;

export default function UserMenu(props) {
  const logouT = props.logout;

  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <></>;
  }
  if (error) {
    return error;
  }
  if (data) {
    return (
      <div className="userMenu">
        <Dropdown overlay={menu(logouT)}>
          <p className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <DownOutlined />
            {data.me.username}
          </p>
        </Dropdown>
      </div>
    );
  }
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
