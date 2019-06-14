import React from "react";
import GameTile from "./GameTile";
import Player from "./Player";

class Gameboard extends React.Component {
  state = {
    player: {
      playerX: 9,
      playerY: 9
    },

    enemy1: null,
    enemy2: null,
    enemy3: null
  };

  handleKeyDown = e => {
    // a physical key was pressed down, not necessarily the down arrow key
    const keyPressedDown = e.code;
    switch (keyPressedDown) {
      case "ArrowUp":
        if (this.state.player.playerY === 0) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            playerY: this.state.player.playerY - 1
          }
        });
    }
    switch (keyPressedDown) {
      case "ArrowDown":
        if (this.state.player.playerY === 9) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            playerY: this.state.player.playerY + 1
          }
        });
    }

    switch (keyPressedDown) {
      case "ArrowRight":
        if (this.state.player.playerX === 9) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            playerX: this.state.player.playerX + 1
          }
        });
    }

    switch (keyPressedDown) {
      case "ArrowLeft":
        if (this.state.player.playerX === 0) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            playerX: this.state.player.playerX - 1
          }
        });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  // randomNumberGenerator = () => {
  //   return Math.floor(Math.random() * 10);
  // };

  // enemyGeneration = () => {
  //   const amountOfEnemies = 6;
  //   let randomNumbers = [];
  //   while (randomNumbers.length < amountOfEnemies) {
  //     const randomNumber = Math.floor(Math.random() * 10);
  //     randomNumbers.push(randomNumber);
  //   }
  //   this.setState({
  //     enemy1: { x: randomNumbers[0], y: randomNumbers[1] },
  //     enemy2: { x: randomNumbers[2], y: randomNumbers[3] },
  //     enemy3: { x: randomNumbers[4], y: randomNumbers[5] }
  //   });
  // };

  // if performance issues arise, refactor this loop
  generateGameTileArray = () => {
    let gameTileArray = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        // checks to see whether the player location in state matches the current tile being generated
        let hasPlayer =
          x === this.state.player.playerX && y === this.state.player.playerY;

        // sets hasEnemy property on various tiles
        const enemyCoordinates = [[1, 3], [4, 5], [7, 8]];
        let hasEnemy =
          (x === enemyCoordinates[0][0] && y === enemyCoordinates[0][1]) ||
          (x === enemyCoordinates[1][0] && y === enemyCoordinates[1][1]) ||
          (x === enemyCoordinates[2][0] && y === enemyCoordinates[2][1]);

        const winningTile = [0, 0];
        let hasWinningTile = x === winningTile[0] && y === winningTile[1];

        gameTileArray.push(
          <GameTile
            xValue={x}
            yValue={y}
            key={`${x},${y}`}
            hasEnemy={hasEnemy}
            hasWinningTile={hasWinningTile}
          >
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
