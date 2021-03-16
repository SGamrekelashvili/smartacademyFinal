import React, { useState } from "react";
import Authorization from "./Components/Authorization/Authorization";
import Dashboard from "./Components/Dashboard";
const App = () => {
  const initial = localStorage.getItem("accessSmartToken") || null;
  const [LoggedIn, setLoggedIn] = useState(initial != null);

  const logout = () => {
    localStorage.removeItem("accessSmartToken");
    setLoggedIn(false);
  };

  if (LoggedIn) {
    return (
      <>
        <Dashboard LoggedIn={LoggedIn} logout={logout} />
      </>
    );
  } else {
    return <Authorization LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />;
  }
};
export default App;
