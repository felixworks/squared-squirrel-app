import React from "react";
import apiService from "./services/api-service";

class Popup extends React.Component {
  state = {
    username: "",
    error: null
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    apiService
      .postUser(this.state.username)
      .then(user => {
        this.props.setUser(user);
        return user;
      })
      .then(user => {
        apiService.getUserStatistics(user.userInfo.username).then(user => {
          // sends user statistics to update state in <Game> component
          this.props.setUserStatistics(user);
          this.props.closePopup();
        });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const error = this.state.error;
    return (
      <div className="authentication-popup-background">
        <form className="authentication-popup" onSubmit={this.handleSubmit}>
          <div role="alert">
            {this.state.error && <p className="red">{error}</p>}
          </div>
          <legend>Login</legend>
          <label htmlFor="username-input">Username</label>
          <input
            type="text"
            id="username-input"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <button type="submit">Submit</button>
          <button onClick={this.props.closePopup}>Back</button>
        </form>
      </div>
    );
  }
}
export default Popup;
