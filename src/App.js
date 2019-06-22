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
      <main className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/game" component={Game} />
            <Route path="/winState" component={WinStatePage} />
            <Route path="/lossState" component={LossStatePage} />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
