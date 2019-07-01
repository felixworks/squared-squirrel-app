import React from "react";
import Header from "./Header";
import Game from "./Game";
import LandingPage from "./LandingPage";
import WinStatePage from "./WinStatePage";
import LossStatePage from "./LossStatePage";
import { Route, Switch, BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <main className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/game" component={Game} />
            <Route path="/winState" component={WinStatePage} />
            <Route path="/lossState" component={LossStatePage} />
          </Switch>
        </main>
        <footer>
          Copyright © 2019 -{" "}
          <a
            className="link"
            href="https://felixworks.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Felix Meyer
          </a>
        </footer>
      </BrowserRouter>
    );
  }
}

export default App;
