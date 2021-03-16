import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import { Col, Row, notification } from "antd";

const openNotification = () => {
  notification["success"]({
    message: "Registration successfully",
    description: "Your Account Now is registered, You Can Login Now",
  });
};

export default function Authorization(props) {
  const [Registered, setRegistered] = useState(false);
  useEffect(() => {
    if (Registered) {
      openNotification();
      setRegistered(false);
    }
  }, [Registered]);
  return (
    <>
      <Row>
        <Col flex="790px">
          <div className="image"></div>
        </Col>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login
                Link={Link}
                LoggedIn={props.LoggedIn}
                setLoggedIn={props.setLoggedIn}
              />
            </Route>
            <Route path="/reg">
              <Registration
                Registered={Registered}
                setRegistered={setRegistered}
                Link={Link}
              />
            </Route>
            <Route path="*">
              <Login
                Link={Link}
                LoggedIn={props.LoggedIn}
                setLoggedIn={props.setLoggedIn}
              />
            </Route>
          </Switch>
        </Router>
      </Row>
    </>
  );
}
