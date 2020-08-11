import React from "react";
import "../style/App.css";
import Home from "./Home";
import Stats from "./Stats";
import LiveGame from "./LiveGame";
import { Switch, Route, Link } from "react-router-dom";
import SearchForm from "./helpers/SearchForm";
import { updateDDragon } from "../redux/actions/ddragonActions";
import { connect } from "react-redux";

export let snackBar = () => {
  let x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};

let mapState = (store) => {
  return {
    ddragonState: store.ddragon,
  };
};

let mapDispatch = (dispatch) => {
  return {
    updateDDragon: () => dispatch(updateDDragon()),
  };
};

function App({ updateDDragon }) {
  React.useEffect(() => {
    updateDDragon();
  }, []);

  return (
    <div className="App">
      <div id="snackbar">Error searching for summoner</div>
      <header className="App-header">
        <div className="LinkContainer">
          <Link to="/">Home</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/live-game">Live Game</Link>
        </div>
        <div className={"App-inputContainer"}>
          <SearchForm header={true} />
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

export default connect(mapState, mapDispatch)(App);
