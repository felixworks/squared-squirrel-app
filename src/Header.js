import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">
          <h1>Squared Squirrel</h1>
        </NavLink>
        <p>Register/Login</p>
      </nav>
    </header>
  );
}

export default Header;
