import React from "react";
import { NavLink } from "react-router-dom";
import Popup from "./Popup";

class Header extends React.Component {
  state = {
    showPopup: false
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    return (
      <header>
        <nav>
          <NavLink to="/">
            <h1>Squared Squirrel</h1>
          </NavLink>
          <button onClick={this.togglePopup}>Register/Login</button>
          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup} />
          ) : null}
        </nav>
      </header>
    );
  }
}

export default Header;
