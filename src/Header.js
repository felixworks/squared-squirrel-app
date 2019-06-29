import React from "react";
import { NavLink } from "react-router-dom";
import Popup from "./Popup";

class Header extends React.Component {
  state = {
    showPopup: false,
    loggedIn: false,
    username: ""
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  toggleLogin = username => {
    this.setState({ loggedIn: !this.state.loggedIn, username: username });
  };

  render() {
    return (
      <header>
        <nav>
          <NavLink className="link" to="/">
            <h1>Squared Squirrel</h1>
          </NavLink>
          {!this.state.loggedIn ? (
            <button
              className="registration-login-button"
              onClick={this.togglePopup}
            >
              Register/Login
            </button>
          ) : (
            <p>Currently logged in username: {this.state.username}</p>
          )}

          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup} loggedIn={this.toggleLogin} />
          ) : null}
        </nav>
      </header>
    );
  }
}

export default Header;
