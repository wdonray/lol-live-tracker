import React from "react";
import { connect } from "react-redux";
import { changeRegion } from "../redux/actions/regionActions";
import { searchSummoner } from "../redux/actions/summonerStatsActions";
import regions from "../redux/constants/regions";
import "../style/HomeStyle.css";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
  };
};

let mapDispatch = (dispatch) => {
  return {
    changeRegion: (value) => dispatch(changeRegion(value)),
    searchSummoner: (region, summonerName, endIndex) =>
      dispatch(searchSummoner(region, summonerName, endIndex)),
  };
};

function Home({ regionState, changeRegion, searchSummoner }) {
  let [summonerName, updateSummonerName] = React.useState("");
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
          searchSummoner(regionState.region, summonerName, 5);
        }}
      >
        <input
          placeholder="Summoner Name..."
          value={summonerName}
          onChange={(event) => updateSummonerName(event.target.value)}
        />
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
