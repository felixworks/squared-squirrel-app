import React from "react";
import { NavLink } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <section className="game-introduction">
        <h2>Welcome to Squared Squirrel!</h2>
        <p>Explanation of gameplay here.</p>
        <NavLink to="/game">
          <p>Start game!</p>
        </NavLink>
      </section>
    );
  }
}

export default LandingPage;
