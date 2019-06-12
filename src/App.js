import React from "react";
import Header from "./Header";
import Game from "./Game";

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Header />
        <Game />
      </main>
    );
  }
}

export default App;
