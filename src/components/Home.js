import React from "react";
import { connect } from "react-redux";
import { changeRegion } from "../redux/actions/regionActions";
import regions from "../redux/constants/regions";
import "../style/HomeStyle.css";

let mapState = (store) => {
  return {
    regionState: store.region,
  };
};

let mapDispatch = (dispatch) => {
  return {
    changeRegion: (value) => dispatch(changeRegion(value)),
  };
};

function Home({ regionState, changeRegion }) {
  return (
    <div className={"centerContainer"}>
      <div>
        <h1>LOL Live Tracker</h1>
        <p onClick={() => window.open("https://www.donrayxwilliams.com/")}>
          Created by Donray Williams
        </p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("GO");
        }}
      >
        <input placeholder="Summoner Name..." />
        <select
          value={Object.keys(regions).find(
            (key) => regions[key] === regionState.region
          )}
          onChange={(event) => {
            changeRegion(regions[event.target.value]);
          }}
        >
          {Object.keys(regions).map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <button>Go</button>
      </form>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Home);
