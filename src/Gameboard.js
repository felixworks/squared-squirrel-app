import React from "react";
import GameTile from "./GameTile";
import Player from "./Player";
import Projectile from "./Projectile";
import { withRouter } from "react-router-dom";

class Gameboard extends React.Component {
  state = {
    player: {
      x: 9,
      y: 9
    },
    enemy1: {
      x: 1,
      y: 3,
      projectile: {
        x: 1,
        y: 3,
        direction: "up"
      }
    },
    enemy2: {
      x: 4,
      y: 5,
      projectile: {
        x: 4,
        y: 5,
        direction: "down"
      }
    },
    enemy3: {
      x: 8,
      y: 1,
      projectile: {
        x: 8,
        y: 1,
        direction: "left"
      }
    }
  };

  // updateProjectileMovement() is currently only called when up arrow is pressed
  updateProjectileMovement = () => {
    // first, generate array of enemies from state
    const startingProjectilesPosition = Object.entries(this.state);
    const enemyList = [];
    startingProjectilesPosition.forEach(function(element) {
      if (element[0].includes("enemy")) {
        enemyList.push(element);
      }
    });
    console.log(enemyList);
    // helper function for next code block
    const setProjectileState = (direction, enemyName) => {
      console.log("direction", direction);
      let desiredState = {};
      switch (direction) {
        case "up":
          desiredState = {
            ...this.state,
            [enemyName]: {
              ...this.state[enemyName],
              projectile: {
                ...this.state[enemyName].projectile,
                y: this.state[enemyName].projectile.y - 1
              }
            }
          };
          break;
        case "down":
          desiredState = {
            ...this.state,
            [enemyName]: {
              ...this.state[enemyName],
              projectile: {
                ...this.state[enemyName].projectile,
                y: this.state[enemyName].projectile.y + 1
              }
            }
          };
          break;
        case "right":
          desiredState = {
            ...this.state,
            [enemyName]: {
              ...this.state[enemyName],
              projectile: {
                ...this.state[enemyName].projectile,
                x: this.state[enemyName].projectile.x + 1
              }
            }
          };
          break;
        case "left":
          desiredState = {
            ...this.state,
            [enemyName]: {
              ...this.state[enemyName],
              projectile: {
                ...this.state[enemyName].projectile,
                x: this.state[enemyName].projectile.x - 1
              }
            }
          };
          break;
      }

      console.log("desiredState", desiredState);
      this.setState(desiredState);
    };
    // loop through the list of enemies, and update each one's position in state
    enemyList.forEach(function(enemy) {
      const enemyName = enemy[0];
      const projectile = enemy[1].projectile;
      if (typeof projectile.x === "number") {
        console.log("projectile.direction", projectile.direction);
        setProjectileState(projectile.direction, enemyName);
      }
    });
  };

  handleKeyDown = e => {
    // a physical key was pressed down, not necessarily the down arrow key
    const keyPressedDown = e.code;
    switch (keyPressedDown) {
      case "ArrowUp":
        if (this.state.player.y === 0) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            y: this.state.player.y - 1
          }
        });
        this.updateProjectileMovement();
    }
    switch (keyPressedDown) {
      case "ArrowDown":
        if (this.state.player.y === 9) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            y: this.state.player.y + 1
          }
        });
        this.updateProjectileMovement();
    }

    switch (keyPressedDown) {
      case "ArrowRight":
        if (this.state.player.x === 9) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            x: this.state.player.x + 1
          }
        });
        this.updateProjectileMovement();
    }

    switch (keyPressedDown) {
      case "ArrowLeft":
        if (this.state.player.x === 0) {
          return null;
        }
        this.setState({
          player: {
            ...this.state.player,
            x: this.state.player.x - 1
          }
        });
        this.updateProjectileMovement();
    }
  };

  winStateCondition = () => {
    // todo: centralize winning coordinates (maybe set in state), and update generateGameTileArray() to use the same source of truth
    // todo: consider integrating/extending this with enemy collision detection and death state
    if (this.state.player.x === 0 && this.state.player.y === 0) {
      this.props.history.push("/winstate");
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    // checks for win state every 0.25 seconds
    this.winChecker = setInterval(() => this.winStateCondition(), 250);
  }

  componentWillUnmount() {
    clearInterval(this.winChecker);
    window.removeEventListener("keydown", this.handleKeyDown);
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
        let hasPlayer = x === this.state.player.x && y === this.state.player.y;

        let hasEnemy =
          (x === this.state.enemy1.x && y === this.state.enemy1.y) ||
          (x === this.state.enemy2.x && y === this.state.enemy2.y) ||
          (x === this.state.enemy3.x && y === this.state.enemy3.y);

        let hasProjectile =
          (x === this.state.enemy1.projectile.x &&
            y === this.state.enemy1.projectile.y) ||
          (x === this.state.enemy2.projectile.x &&
            y === this.state.enemy2.projectile.y) ||
          (x === this.state.enemy3.projectile.x &&
            y === this.state.enemy3.projectile.y);

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
            {hasProjectile && <Projectile />}
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

export default withRouter(Gameboard);
