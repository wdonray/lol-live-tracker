import React from "react";
import { snackBar } from "../App";
import regions from "../../redux/constants/regions";
import { useHistory, useLocation } from "react-router-dom";
import { changeRegion } from "../../redux/actions/regionActions";
import {
  searchSummoner,
  updateLoading,
} from "../../redux/actions/summonerStatsActions";
import { connect } from "react-redux";
import "../../style/SearchForm.css";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
  };
};

let mapDispatch = (dispatch) => {
  return {
    changeRegion: (value) => dispatch(changeRegion(value)),
    searchSummoner: (region, summonerName) =>
      dispatch(searchSummoner(region, summonerName)),
    updateLoading: (value) => dispatch(updateLoading(value)),
  };
};
function SearchFrom({
  regionState,
  statsState,
  changeRegion,
  searchSummoner,
  updateLoading,
  header,
}) {
  let location = useLocation();
  let history = useHistory();
  let [summonerName, updateSummonerName] = React.useState("HULKSMASH1337");
  return (
    <form
      style={{ opacity: location.pathname === "/" && header ? 0 : 1 }}
      onSubmit={(event) => {
        event.preventDefault();
        if (!statsState.loading) {
          searchSummoner(regionState.region, summonerName).then((data) => {
            if (location.pathname === "/") {
              history.push("/stats");
            }
            updateLoading(false);
            if (data.payload instanceof Error) {
              //If an account has no matches it will show error
              snackBar();
            }
          });
        }
      }}
    >
      <input
        placeholder="Summoner Name..."
        value={summonerName}
        onChange={(event) => {
          if (!statsState.loading) {
            updateSummonerName(event.target.value);
          }
        }}
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
      <button
        disabled={statsState.loading}
        className={statsState.loading ? "loader" : null}
      >
        {statsState.loading ? "" : "Go"}
      </button>
    </form>
  );
}

export default connect(mapState, mapDispatch)(SearchFrom);
