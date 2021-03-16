import React, { useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./styles";
import DashboardHeader from "./Dashboard/Header";
import SideBar from "./Dashboard/SideBar";
import DashboardContent from "./Dashboard/DashboardContent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Dashboard(props) {
  const [Collapsed, setCollapsed] = useState(false);
  const getKey = () => {
    const location = window.location.href.split("/")[3];
    if (location === "todos") {
      return 2;
    } else if (location === "settings") {
      return 3;
    } else {
      return 1;
    }
  };

  const [NavKey, setNavKey] = useState(getKey);
  const toggle = () => {
    setCollapsed(!Collapsed);
  };

  return (
    <Layout className="Layout">
      <Router>
        <SideBar
          Collapsed={Collapsed}
          NavKey={NavKey}
          setNavKey={setNavKey}
          Link={Link}
          Sider={Sider}
        />
        <Layout className="site-layout">
          <DashboardHeader
            LoggedIn={props.LoggedIn}
            logout={props.logout}
            Collapsed={Collapsed}
            toggle={toggle}
            MenuUnfoldOutlined={MenuUnfoldOutlined}
            MenuFoldOutlined={MenuFoldOutlined}
            Header={Header}
          />
          <DashboardContent Content={Content} Switch={Switch} Route={Route} />
        </Layout>
      </Router>
    </Layout>
  );
}

export default Dashboard;
