import React from "react";
import "../style/App.css";
import Home from "./Home";
import Stats from "./Stats";
import LiveGame from "./LiveGame";
import { Switch, Route, Link, useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <header className="App-header">
        <div className="LinkContainer">
          <Link to="/">Home</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/live-game">Live Game</Link>
        </div>
        <div className={"App-inputContainer"}>
          <input
            style={{ opacity: location.pathname === "/" ? 0 : 1 }}
            type="text"
            name="search"
            placeholder="Summoner Name..."
          />
        </div>
      </header>
      <div style={{ marginTop: "5vh" }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/live-game">
            <LiveGame />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
