import React from "react";
import { NavLink } from "react-router-dom";
import armoredSquirrelImage from "./images/squirrel-in-armor.jpg";

class LandingPage extends React.Component {
  render() {
    return (
      <section className="game-introduction">
        <h2>SKREEEE!!!</h2>
        <p>
          The battle cries deafen your fluffy little ears. <br /> Can you
          scamper past the Aviary Towers and their legions of winged beasts to
          the safety of your home tree?
        </p>
        <img
          className="armored-squirrel-image"
          src={armoredSquirrelImage}
          alt="Squirrel wearing armor"
        />
        <NavLink to="/game">
          <p>Start game!</p>
        </NavLink>
      </section>
    );
  }
}

export default LandingPage;
