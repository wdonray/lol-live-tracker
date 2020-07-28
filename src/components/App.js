import React from "react";
import "../style/App.css";
import HomePage from "./Home";
import Stats from "./Stats";
import LiveGame from "./LiveGame";

const Routes = ({ pathname }) => {
  switch (pathname) {
    case "/":
      return <HomePage />;
    case "/stats":
      return <Stats />;
    case "/live-game":
      return <LiveGame />;
    default:
      return <div style={{ color: "white" }}>404 Error</div>;
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="LinkContainer">
          <a href="/">Home</a>
          <a href="stats">Stats</a>
          <a href="live-game">Live Game</a>
        </div>
        <div className={"App-inputContainer"}>
          <input
            style={{ opacity: window.location.pathname === "/" ? 0 : 1 }}
            type="text"
            name="search"
            placeholder="Summoner Name..."
          />
        </div>
      </header>
      <div style={{ marginTop: "5vh" }}>
        <Routes pathname={window.location.pathname} />
      </div>
    </div>
  );
}

export default App;
