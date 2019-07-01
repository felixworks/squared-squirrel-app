import React from "react";
import { NavLink } from "react-router-dom";

class WinStatePage extends React.Component {
  render() {
    return (
      <section className="winstate-box">
        <h2>You've won!</h2>
        <NavLink className="link end-link" to="/game">
          Play again?
        </NavLink>
      </section>
    );
  }
}

export default WinStatePage;
