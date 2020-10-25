import React from "react";
import { connect } from "react-redux";
import search from "../assets/search.png";
import LoadingSpinner from "./helpers/LoadingSpinner";
import "../style/LiveGameStyle.css";
import { liveGameLength } from "../util/unixTimeConverter";
import { getChampionName, getQueueType, getMapName } from "../util/formatData";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
    ddragonState: store.ddragon,
  };
};

function LiveGame({ statsState, ddragonState }) {
  console.log(statsState.liveGame, statsState.loading);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [gameLength, setGameLength] = React.useState(
    statsState.liveGame ? statsState.liveGame.gameLength : 0
  );
  let isMobile = width <= 768;

  React.useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [isMobile]);

  return (
    <div style={{ color: "white" }}>
      {statsState.loading ? (
        <LoadingSpinner />
      ) : statsState.liveGame ? (
        <div>
          <div className={"playerBanner"}>
            <p>
              {getQueueType(
                ddragonState.queues,
                statsState.liveGame.gameQueueConfigId,
                statsState.liveGame.gameMode
              )}{" "}
              | {getMapName(ddragonState.maps, statsState.liveGame.mapId)} |{" "}
              {liveGameLength(statsState.liveGame.gameLength)}
            </p>
            <button className={"refresh"}>Refresh</button>
          </div>
          <div className={"mainContainer"}>IN PROGRESS</div>{" "}
        </div>
      ) : (
        <div
          className={"searchContainer"}
        >
          <img alt="404" src={search} className={"searchImage"} />
          <p>Please search for a summoner</p>
        </div>
      )}
    </div>
  );
}

export default connect(mapState)(LiveGame);
