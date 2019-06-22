import React from "react";
import { NavLink } from "react-router-dom";

class LossStatePage extends React.Component {
  render() {
    return (
      <section className="lossstate-box">
        <h2>You've lost!</h2>
        <NavLink to="/game">Play again?</NavLink>
      </section>
    );
  }
}

export default LossStatePage;
