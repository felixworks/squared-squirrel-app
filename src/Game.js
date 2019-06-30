import React from "react";
import Gameboard from "./Gameboard";
import UserStatus from "./UserStatus";
import UserStatistics from "./UserStatistics";
import apiService from "./services/api-service";

class Game extends React.Component {
  state = {
    loggedIn: false,
    user: null,
    userStatistics: null
  };

  setUser = user => {
    console.log("user in setUser", user);
    this.setState({ loggedIn: true, user: user });
  };

  setUserStatistics = userStatistics => {
    console.log("userStatistics in setUserStatistics", userStatistics);
    this.setState({ userStatistics: userStatistics });
  };

  patchUserStatistics = (
    incrementGamesPlayed,
    incrementGamesWon,
    lowestTimeWin
  ) => {
    if (this.state.loggedIn) {
      const changesToUserStatistics = {
        id: this.state.user.userInfo.id,
        incrementGamesPlayed,
        incrementGamesWon,
        lowestTimeWin
      };
      console.log("changesToUserStatistics", changesToUserStatistics);
      apiService.updateUserStatistics(changesToUserStatistics);
    }
  };

  componentDidMount() {
    // access previous state from session storage, and update local values as needed
    let stateFromSessionStorage = null;
    if (sessionStorage.getItem("userStatus")) {
      stateFromSessionStorage = JSON.parse(
        sessionStorage.getItem("userStatus")
      );
      console.log("stateFromSessionStorage", stateFromSessionStorage);
      const updated_games_played =
        stateFromSessionStorage.userStatistics.games_played + 1;
      if (stateFromSessionStorage.wonLastGame) {
        stateFromSessionStorage.userStatistics.games_won += 1;
      }
      this.setState({
        ...stateFromSessionStorage,
        userStatistics: {
          ...stateFromSessionStorage.userStatistics,
          games_played: updated_games_played,
          games_won: stateFromSessionStorage.userStatistics.games_won
        }
      });
    }
  }

  render() {
    return (
      <>
        <UserStatus
          userStatus={this.state}
          setUser={this.setUser}
          userStatistics={this.userStatistics}
          setUserStatistics={this.setUserStatistics}
        />
        {this.state.userStatistics && (
          <UserStatistics
            userStatus={this.state}
            userStatistics={this.userStatistics}
          />
        )}
        <Gameboard
          patchUserStatistics={this.patchUserStatistics}
          userStatus={this.state}
        />
        <section className="touch-controls-container">
          <form>
            <button id="button-up" className="button-up" value="ArrowUp">
              Up
            </button>
            <button id="button-left" className="button-left" value="ArrowLeft">
              Left
            </button>
            <button id="button-down" className="button-down" value="ArrowDown">
              Down
            </button>
            <button
              id="button-right"
              className="button-right"
              value="ArrowRight"
            >
              Right
            </button>
          </form>
        </section>
        <section className="game-hints">
          <p>
            <b>Hint:</b> Eagles may leave the map, but they do not give up.
          </p>
        </section>
      </>
    );
  }
}

export default Game;
