import React from "react";
import Popup from "./Popup";

class UserStatus extends React.Component {
  state = {
    showPopup: false,
    username: ""
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    console.log("this.props.userStatus", this.props.userStatus);
    return (
      <div className="user-status">
        {!this.props.userStatus.loggedIn ? (
          <button
            className="registration-login-button"
            onClick={this.togglePopup}
          >
            Register/Login
          </button>
        ) : null}

        {this.state.showPopup ? (
          <Popup
            closePopup={this.togglePopup}
            setUser={this.props.setUser}
            setUserStatistics={this.props.setUserStatistics}
          />
        ) : null}
      </div>
    );
  }
}
export default UserStatus;
