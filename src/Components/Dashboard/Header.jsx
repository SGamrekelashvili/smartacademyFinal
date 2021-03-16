import React, { createElement } from "react";
import UserMenu from "./Components/UserMenu";
function DashboardHeader(props) {
  return (
    <props.Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      {createElement(
        props.Collapsed ? props.MenuUnfoldOutlined : props.MenuFoldOutlined,
        {
          className: "trigger",
          onClick: props.toggle,
        }
      )}
      <UserMenu LoggedIn={props.LoggedIn} logOut={props.logout} />
    </props.Header>
  );
}
export default DashboardHeader;
