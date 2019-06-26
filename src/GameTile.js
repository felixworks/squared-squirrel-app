import React from "react";
import treeImage from "./images/tree-shape.svg";
import towerImage from "./images/tower.svg";

function GameTile(props) {
  let tileType = "grid-item ";
  let tileImage = null;
  if (props.hasEnemy) {
    tileType += "enemy-tile";
    tileImage = (
      <img
        className="tower-image"
        src={towerImage}
        alt="Line drawing of a medieval-style stone tower"
      />
    );
  }
  if (props.hasWinningTile) {
    tileType += "winning-tile";
    tileImage = (
      <img
        className="tree-image"
        src={treeImage}
        alt="Line drawing of a tree"
      />
    );
  }

  return (
    <div className={tileType}>
      {tileImage}
      {props.children}
    </div>
  );
}

export default GameTile;
