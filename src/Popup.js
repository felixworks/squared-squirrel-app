import React from "react";
import AuthApiService from "./services/auth-api-service";

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
    AuthApiService.postUser({ username: this.state.username })
      .then(user => {
        this.setState({
          username: ""
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
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <legend>Register/Login</legend>
          <label htmlFor="username-input">Username</label>
          <input
            type="text"
            placeholder="Username"
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
