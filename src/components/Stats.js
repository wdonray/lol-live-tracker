import React from "react";
import { connect } from "react-redux";
import "../style/StatsStyle.css";
import LoadingSpinner from "./helpers/LoadingSpinner";
import { addStyle, addStyleArray } from "../util/addStyle";
import capitalize from "../util/capitalize";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
  };
};

function Stats({ regionState, statsState }) {
  let [leftSidePanel, toggleSidePanel] = React.useState(false);

  let togglePanelOn = () => {
    addStyleArray("leftSidePanel", [
      { key: "width", value: "250px" },
      { key: "border", value: "2px solid gold" },
      { key: "borderLeft", value: "transparent" },
    ]);
    addStyleArray("body", [
      { key: "opacity", value: "1" },
      { key: "transition", value: "1s" },
    ]);
    addStyle("pageLoader", "opacity", "0");
    addStyle("pageLoader2", "opacity", "0");
    toggleSidePanel(true);
  };

  let togglePanelOff = () => {
    addStyleArray("leftSidePanel", [
      { key: "width", value: "0" },
      { key: "border", value: "0px solid transparent" },
    ]);
    addStyleArray("body", [
      { key: "opacity", value: "0" },
      { key: "transition", value: "0.1s" },
    ]);
    addStyle("pageLoader", "opacity", "1");
    addStyle("pageLoader2", "opacity", "1");
    toggleSidePanel(false);
  };

  React.useEffect(() => {
    if (!leftSidePanel) {
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
              <span className={'level'}>{statsState.summonerLevel}</span>
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
              ? capitalize(statsState.queueType.toLowerCase()).replaceAll(
                  "_",
                  " "
                )
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
    return "Search For Summoner";
  };

  return (
    <div>
      <LoadingSpinner />
      <div style={{ color: "white" }}>
        <div id="leftSidePanel" className="leftSidePanel">
          <div id="body">
            <LeftSidePanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapState)(Stats);
