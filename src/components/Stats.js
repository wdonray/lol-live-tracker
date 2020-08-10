import React from "react";
import { connect } from "react-redux";
import "../style/StatsStyle.css";
import LoadingSpinner from "./helpers/LoadingSpinner";
import { addStyle, addStyleArray } from "../util/addStyle";
import capitalize from "../util/capitalize";
import search from "../assets/search.png";
import { gameDate, gameLength } from "../util/unixTimeConverter";
import {
  showMoreMatches,
  showMore,
} from "../redux/actions/summonerStatsActions";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
  };
};

let mapDispatch = (dispatch) => {
  return {
    showMore: (value) => dispatch(showMore(value)),
    showMoreMatches: (endIndex) => dispatch(showMoreMatches(endIndex)),
  };
};

function Stats({ statsState, showMore, showMoreMatches }) {
  let [sidePanel, toggleSidePanel] = React.useState(false);

  let togglePanelOn = () => {
    addStyleArray("leftSidePanel", [
      { key: "width", value: "250px" },
      { key: "border", value: "2px solid gold" },
      { key: "borderLeft", value: "transparent" },
    ]);
    addStyleArray("rightSidePanel", [
      { key: "width", value: "250px" },
      { key: "border", value: "2px solid gold" },
      { key: "borderRight", value: "transparent" },
    ]);
    addStyleArray("leftBody", [
      { key: "opacity", value: "1" },
      { key: "transition", value: "1s" },
    ]);
    addStyleArray("rightBody", [
      { key: "opacity", value: "1" },
      { key: "transition", value: "1s" },
    ]);
    toggleSidePanel(true);
  };

  let togglePanelOff = () => {
    addStyleArray("leftSidePanel", [
      { key: "width", value: "0" },
      { key: "border", value: "0px solid transparent" },
    ]);
    addStyleArray("rightSidePanel", [
      { key: "width", value: "0" },
      { key: "border", value: "0px solid transparent" },
    ]);
    addStyleArray("leftBody", [
      { key: "opacity", value: "0" },
      { key: "transition", value: "0.1s" },
    ]);
    addStyleArray("rightBody", [
      { key: "opacity", value: "0" },
      { key: "transition", value: "0.1s" },
    ]);
    toggleSidePanel(false);
  };

  React.useEffect(() => {
    if (!sidePanel) {
      togglePanelOn();
    }

    if (statsState.loading) {
      togglePanelOff();
    }
  });

  let checkIfUnranked = () => {
    if (statsState.tier) {
      return `${statsState.tier} ${statsState.rank}`;
    } else {
      return "Unranked";
    }
  };

  let LeftSidePanel = () => {
    if (statsState.id) {
      return (
        <div>
          <div className={"profileIcon"}>
            {statsState.profileIconId ? (
              <img
                className={"profileIconImage"}
                alt={"Icon not found"}
                src={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/${statsState.profileIconId}.png`}
              />
            ) : null}
            {statsState.summonerLevel ? (
              <span className={"level"}>{statsState.summonerLevel}</span>
            ) : null}
          </div>
          <p>Name: {statsState.name}</p>
          {statsState.tier ? (
            <img
              className={"rankedIcon"}
              alt="icon not found"
              id="icon"
              src={require(`../assets/Emblem_${capitalize(
                statsState.tier.toLowerCase()
              )}.png`)}
            />
          ) : (
            <img
              className={"rankedIcon"}
              alt="icon not found"
              id="icon"
              src={require("../assets/Emblem_Unranked.png")}
            />
          )}
          <p className={"lightText"}>
            {statsState.queueType
              ? capitalize(statsState.queueType.toLowerCase())
                  .replaceAll("_", " ")
                  .replace("sr", "")
                  .replace("5x5", "")
              : null}
          </p>
          <p>Rank: {checkIfUnranked()}</p>
          <p>
            {statsState.leaguePoints ? `LP: ${statsState.leaguePoints}` : null}
          </p>
          <p>
            {statsState.wins && statsState.losses
              ? `Wins/Losses: ${statsState.wins} / ${statsState.losses}`
              : null}
          </p>
          <p>
            {statsState.wins && statsState.losses
              ? `Win Ratio:
              ${Math.round(
                (statsState.wins / (statsState.wins + statsState.losses)) * 100
              )}%`
              : null}
          </p>
        </div>
      );
    }
    return null;
  };

  let RightSidePanel = () => {
    if (statsState.id && statsState.matches) {
      return <p>{`Match Count: ${statsState.endIndex}`}</p>;
    }
    return null;
  };

  return (
    <div>
      {statsState.loading ? <LoadingSpinner /> : null}
      {statsState.id || statsState.loading ? null : (
        <div
          style={{ opacity: statsState.id || statsState.loading ? 0 : 1 }}
          className={"searchContainer"}
        >
          <img alt="404" src={search} className={"searchImage"} />
          <p>Please search for a summoner</p>
        </div>
      )}

      <div
        style={{ opacity: statsState.matches ? 1 : 0 }}
        className={"matchCardContainer"}
      >
        {statsState.matches
          ? statsState.matches.map((match) => (
              <div key={match.gameId} className={"matchCard"}>
                {match.gameId}
              </div>
            ))
          : null}
        <button
          className="showMore"
          disabled={statsState.maxMatches}
          onClick={() => {
            showMore(statsState.endIndex + 5);
            showMoreMatches(statsState.endIndex + 5);
          }}
        >
          {statsState.maxMatches ? "End of Match History" : "Show More"}
        </button>
      </div>
      <div
        style={{ opacity: statsState.id ? 1 : 0 }}
        id="leftSidePanel"
        className="leftSidePanel"
      >
        <div id="leftBody">
          <LeftSidePanel />
        </div>
      </div>
      <div
        style={{ opacity: statsState.id ? 1 : 0 }}
        id="rightSidePanel"
        className="rightSidePanel"
      >
        <div id="rightBody">
          <RightSidePanel />
        </div>
      </div>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Stats);
