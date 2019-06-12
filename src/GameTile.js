import React from "react";

function GameTile(props) {
  // randomly select some tiles to have enemies
  let containsEnemy = null;
  if (
    props.xValue === Math.floor(Math.random() * 10) &&
    props.yValue === Math.floor(Math.random() * 10)
  ) {
    containsEnemy = true;
  }
  return (
    <div className="grid-item">
      Square <br /> x={props.xValue} y={props.yValue} <br />
      {containsEnemy && <p>Contains Enemy</p>}
    </div>
  );
}

export default GameTile;
