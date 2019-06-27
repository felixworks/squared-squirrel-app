import React from "react";
import Gameboard from "./Gameboard";

class Game extends React.Component {
  render() {
    return (
      <>
        <Gameboard />
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
