import React from "react";
import firebase from "./Firebase";
import "firebase/auth";
import { tsImportEqualsDeclaration } from "@babel/types";

let googleProvider = new firebase.auth.GoogleAuthProvider();

class Popup extends React.Component {
  state = {
    email: "",
    password: ""
  };
  googleAuthentication = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        console.log("user", user);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  };
  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  // need to add Firebase function call for email/password combo when the Submit button is clicked
  render() {
    return (
      <div className="authentication-popup-background">
        <form className="authentication-popup">
          <legend>Register</legend>
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button>Submit - currently non-functional</button>
          <button onClick={this.googleAuthentication}>Login with Google</button>
          <button onClick={this.props.closePopup}>Back</button>
        </form>
      </div>
    );
  }
}
export default Popup;
