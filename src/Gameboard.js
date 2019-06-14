import React from "react";
import GameTile from "./GameTile";
import Player from "./Player";

class Gameboard extends React.Component {
  state = {
    playerX: 9,
    playerY: 9
  };

  handleKeyDown = e => {
    // a physical key was pressed down, not necessarily the down arrow key
    const keyPressedDown = e.code;
    switch (keyPressedDown) {
      case "ArrowUp":
        if (this.state.playerY === 0) {
          console.log("Game barrier reached");
          return null;
        }
        this.setState({
          playerY: this.state.playerY - 1
        });
    }
    switch (keyPressedDown) {
      case "ArrowDown":
        if (this.state.playerY === 9) {
          console.log("Game barrier reached");
          return null;
        }
        this.setState({
          playerY: this.state.playerY + 1
        });
    }

    switch (keyPressedDown) {
      case "ArrowRight":
        if (this.state.playerX === 9) {
          console.log("Game barrier reached");
          return null;
        }
        this.setState({
          playerX: this.state.playerX + 1
        });
    }

    switch (keyPressedDown) {
      case "ArrowLeft":
        if (this.state.playerX === 0) {
          console.log("Game barrier reached");
          return null;
        }
        this.setState({
          playerX: this.state.playerX - 1
        });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  // if performance issues arise, refactor this loop
  generateGameTileArray = () => {
    let gameTileArray = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        let hasPlayer = x === this.state.playerX && y === this.state.playerY;

        gameTileArray.push(
          <GameTile xValue={x} yValue={y} key={`${x},${y}`}>
            {hasPlayer && <Player />}
          </GameTile>
        );
      }
    }
    return gameTileArray;
  };
  render() {
    return (
      <section className="grid-container">
        {this.generateGameTileArray()}
      </section>
    );
  }
}

export default Gameboard;
