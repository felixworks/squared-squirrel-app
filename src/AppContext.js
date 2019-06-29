import React from "react";

const AppContext = React.createContext({
  loggedin: false,
  user: null,
  setLogInStatus: () => {}
});

export default AppContext;
