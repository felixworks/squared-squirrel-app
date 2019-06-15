import React from "react";
import Header from "./Header";
import Game from "./Game";
import LandingPage from "./LandingPage";
import WinStatePage from "./WinStatePage";
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
            <Route path="/winstate" component={WinStatePage} />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
