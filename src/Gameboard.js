import React from "react";
import GameTile from "./GameTile";
import Player from "./Player";
import Projectile from "./Projectile";
import { withRouter } from "react-router-dom";

let winningCoordinates = [0, 0];

class Gameboard extends React.Component {
  state = {
    isPlayerAlive: true,
    player: {
      x: 9,
      y: 9
    },
    enemy1: {
      x: 1,
      y: 3,
      projectiles: {
        a: {
          x: 1,
          y: 3,
          direction: "up"
        },
        b: {
          x: 1,
          y: 3,
          direction: "down"
        },
        c: {
          x: 1,
          y: 3,
          direction: "right"
        },
        d: {
          x: 1,
          y: 3,
          direction: "left"
        }
      }
    },
    enemy2: {
      x: 4,
      y: 5,
      projectiles: {
        a: {
          x: 4,
          y: 5,
          direction: "up"
        },
        b: {
          x: 4,
          y: 5,
          direction: "down"
        },
        c: {
          x: 4,
          y: 5,
          direction: "right"
        },
        d: {
          x: 4,
          y: 5,
          direction: "left"
        }
      }
    },
    enemy3: {
      x: 8,
      y: 1,
      projectiles: {
        a: {
          x: 8,
          y: 1,
          direction: "up"
        },
        b: {
          x: 8,
          y: 1,
          direction: "down"
        },
        c: {
          x: 8,
          y: 1,
          direction: "right"
        },
        d: {
          x: 8,
          y: 1,
          direction: "left"
        }
      }
    }
  };

  //checks whether a projectile is at the edge of the board and needs to be flipped
  directionFlipper = (initialDirection, enemyName, projectileLetter) => {
    if (
      (this.state[enemyName].projectiles[projectileLetter].y === 0 &&
        initialDirection === "up") ||
      (this.state[enemyName].projectiles[projectileLetter].y === 9 &&
        initialDirection === "down") ||
      (this.state[enemyName].projectiles[projectileLetter].x === 0 &&
        initialDirection === "left") ||
      (this.state[enemyName].projectiles[projectileLetter].x === 9 &&
        initialDirection === "right")
    ) {
      switch (initialDirection) {
        case "up":
          return "down";
        case "down":
          return "up";
        case "right":
          return "left";
        case "left":
          return "right";
      }
    } else {
      return initialDirection;
    }
  };

  // helper function for next code block - handles projectile movement by making the appropriate changes in state
  setProjectileState = (projectileLetter, direction, enemyName) => {
    let desiredState = {};
    const flippedDirection = this.directionFlipper(
      direction,
      enemyName,
      projectileLetter
    );

    switch (direction) {
      case "up":
        desiredState = {
          ...this.state,
          [enemyName]: {
            ...this.state[enemyName],
            projectiles: {
              ...this.state[enemyName].projectiles,
              [projectileLetter]: {
                ...this.state[enemyName].projectiles[projectileLetter],
                y: this.state[enemyName].projectiles[projectileLetter].y - 1,
                direction: flippedDirection
              }
            }
          }
        };
        break;
      case "down":
        desiredState = {
          ...this.state,
          [enemyName]: {
            ...this.state[enemyName],
            projectiles: {
              ...this.state[enemyName].projectiles,
              [projectileLetter]: {
                ...this.state[enemyName].projectiles[projectileLetter],
                y: this.state[enemyName].projectiles[projectileLetter].y + 1,
                direction: flippedDirection
              }
            }
          }
        };
        break;
      case "right":
        desiredState = {
          ...this.state,
          [enemyName]: {
            ...this.state[enemyName],
            projectiles: {
              ...this.state[enemyName].projectiles,
              [projectileLetter]: {
                ...this.state[enemyName].projectiles[projectileLetter],
                x: this.state[enemyName].projectiles[projectileLetter].x + 1,
                direction: flippedDirection
              }
            }
          }
        };
        break;
      case "left":
        desiredState = {
          ...this.state,
          [enemyName]: {
            ...this.state[enemyName],
            projectiles: {
              ...this.state[enemyName].projectiles,
              [projectileLetter]: {
                ...this.state[enemyName].projectiles[projectileLetter],
                x: this.state[enemyName].projectiles[projectileLetter].x - 1,
                direction: flippedDirection
              }
            }
          }
        };
        break;
    }

    // console.log("desiredState", desiredState);
    this.setState(desiredState);
  };

  updateProjectileMovement = () => {
    // first, generate array of enemies from state
    const startingProjectilesPosition = Object.entries(this.state);
    const enemyList = [];
    startingProjectilesPosition.forEach(element => {
      if (element[0].includes("enemy")) {
        enemyList.push(element);
      }
    });

    // loop through the list of enemies, and update each enemy's projectiles' positions/directions in state
    enemyList.forEach(enemy => {
      const enemyName = enemy[0];
      const projectiles = enemy[1].projectiles;
      Object.keys(projectiles).forEach(projectile => {
        const projectileDirection = projectiles[projectile]["direction"];
        const projectileLetter = projectile;
        this.setProjectileState(
          projectileLetter,
          projectileDirection,
          enemyName
        );
      });
    });
  };

  handleKeyDown = e => {
    // this function runs when a physical arrow key is pressed down
    e.preventDefault();
    console.log("e.code", e.code);
    console.log("e", e.target.value);
    let keyPressedDown = null;
    if (e.code) {
      keyPressedDown = e.code;
    } else {
      keyPressedDown = e.target.value;
    }

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
        break;

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
        break;

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
        break;

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
        break;
    }
  };

  handleArrowButtonClick = e => {
    // this function runs when either a physical arrow key is pressed down, or one of the <button>'s intended for touchscreens is clicked
    e.preventDefault();
    this.handleKeyDown(e.target.value);
    //   console.log("e.target.value1", e.target.value);
    //   e.preventDefault();
    //   e.stopPropagation();
    //   let buttonClicked = e.target.value;

    //   switch (buttonClicked) {
    //     case "ArrowUp":
    //       console.log("buttonClicked inside ArrowUp", buttonClicked);
    //       if (this.state.player.y === 0) {
    //         return null;
    //       }
    //       console.log("before setState has run", this.state.player);
    //       this.setState({
    //         player: {
    //           ...this.state.player,
    //           y: this.state.player.y - 1
    //         }
    //       });

    //       this.updateProjectileMovement();
    //       console.log("after setState has run", this.state.player);
    //       break;

    //     case "ArrowDown":
    //       if (this.state.player.y === 9) {
    //         return null;
    //       }
    //       this.setState({
    //         player: {
    //           ...this.state.player,
    //           y: this.state.player.y + 1
    //         }
    //       });
    //       this.updateProjectileMovement();
    //       break;

    //     case "ArrowRight":
    //       if (this.state.player.x === 9) {
    //         return null;
    //       }
    //       this.setState({
    //         player: {
    //           ...this.state.player,
    //           x: this.state.player.x + 1
    //         }
    //       });
    //       this.updateProjectileMovement();
    //       break;

    //     case "ArrowLeft":
    //       console.log("buttonClicked inside ArrowLeft", buttonClicked);
    //       if (this.state.player.x === 0) {
    //         return null;
    //       }
    //       this.setState({
    //         player: {
    //           ...this.state.player,
    //           x: this.state.player.x - 1
    //         }
    //       });
    //       this.updateProjectileMovement();
    //       break;
    //   }
  };

  gameStateCondition = () => {
    if (
      this.state.player.x === winningCoordinates[0] &&
      this.state.player.y === winningCoordinates[1]
    ) {
      this.props.history.push("/winState");
    }

    if (!this.state.isPlayerAlive) {
      this.props.history.push("/lossState");
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("click", e => {
      if (e.target.value.includes("Arrow")) {
        this.handleKeyDown(e);
      }
    });
    // checks for win state every 0.25 seconds
    this.gameStateChecker = setInterval(() => this.gameStateCondition(), 250);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    clearInterval(this.gameStateChecker);
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

  //checks whether a tile should render a Projectile
  renderProjectiles = (tileX, tileY) => {
    // let hasProjectile = false;
    // const initialList = this.state;

    // const projectileListGrabber = object => {
    //   Object.keys(object).forEach(enemy => {
    //     if (enemy.includes("enemy")) {
    //       Object.keys(object[enemy]).forEach(projectiles => {
    //         if (projectiles.includes("projectiles")) {
    //           Object.keys(object[enemy][projectiles]).forEach(projectile => {
    //             if (
    //               object[enemy][projectiles][projectile]["x"] === tileX &&
    //               object[enemy][projectiles][projectile]["y"] === tileY
    //             ) {
    //               hasProjectile = true;
    //             }
    //           });
    //         }
    //       });
    //     }
    //   });
    // };

    let hasProjectile2 = false;
    const initialList2 = this.state;

    const projectileListGrabber2 = object => {
      for (const enemy in object) {
        if (enemy.includes("enemy")) {
          for (const projectiles in object[enemy]) {
            for (const projectile in object[enemy][projectiles]) {
              for (const variable in object[enemy][projectiles][projectile]) {
                if (
                  tileX === object[enemy][projectiles][projectile]["x"] &&
                  tileY === object[enemy][projectiles][projectile]["y"]
                ) {
                  hasProjectile2 = true;
                }
              }
            }
          }
        }
      }
    };
    projectileListGrabber2(initialList2);
    return hasProjectile2;
  };

  // if performance issues arise, refactor this loop
  generateGameTileArray = () => {
    let gameTileArray = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        // checks to see whether the player location in state matches the current tile being generated
        const hasPlayer =
          x === this.state.player.x && y === this.state.player.y;

        const hasEnemy =
          (x === this.state.enemy1.x && y === this.state.enemy1.y) ||
          (x === this.state.enemy2.x && y === this.state.enemy2.y) ||
          (x === this.state.enemy3.x && y === this.state.enemy3.y);

        const hasProjectile = this.renderProjectiles(x, y);

        const hasWinningTile =
          x === winningCoordinates[0] && y === winningCoordinates[1];

        if ((hasPlayer && hasProjectile) || (hasPlayer && hasEnemy)) {
          console.log("player has died");
          this.setState({
            ...this.state,
            isPlayerAlive: false
          });
          // added this line to resolve an infinite loop caused by setting state in render()
          this.gameStateCondition();
        }

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

  // touchClickHandler = () => {
  //   if ("ontouchstart" in document.documentElement === true)
  //     return "touchstart";
  //   else return "click";
  // };

  render() {
    return (
      <>
        <section className="grid-container">
          {this.generateGameTileArray()}
        </section>
        <section className="touch-controls-container">
          <form>
            <button id="button-up" className="button-up" value="ArrowUp">
              Up
            </button>
            <button id="button-down" className="button-down" value="ArrowDown">
              Down
            </button>
            <button id="button-left" className="button-left" value="ArrowLeft">
              Left
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
      </>
    );
  }
}

export default withRouter(Gameboard);
