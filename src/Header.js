import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <NavLink className="link" to="/">
            <h1>Squared Squirrel</h1>
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
