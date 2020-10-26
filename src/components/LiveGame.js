import React from "react";
import { connect } from "react-redux";
import search from "../assets/search.png";
import LoadingSpinner from "./helpers/LoadingSpinner";
import "../style/LiveGameStyle.css";
import { liveGameLength } from "../util/unixTimeConverter";
import { getChampionName, getQueueType, getMapName } from "../util/formatData";
import { getLiveGame } from "../redux/actions/summonerStatsActions";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
    ddragonState: store.ddragon,
  };
};

let mapDispatch = (dispatch) => {
  return {
    getLiveGame: (region, id) => dispatch(getLiveGame(region, id)),
  };
};

function LiveGame({ statsState, ddragonState, regionState, getLiveGame }) {
  console.log(statsState);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [gameLength, setGameLength] = React.useState(0);
  let isMobile = width <= 768;

  React.useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    const interval = setInterval(() => {
      if (statsState.liveGame) {
        setGameLength((gameLength) => gameLength + 1);
      }
    }, 1000);

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      clearInterval(interval);
    };
  }, [isMobile, gameLength, statsState.liveGame]);

  return (
    <div style={{ color: "white" }}>
      {statsState.loading ? (
        <LoadingSpinner />
      ) : statsState.id ? (
        statsState.liveGame ? (
          <div>
            <div className={"playerBanner"}>
              <p>
                {getQueueType(
                  ddragonState.queues,
                  statsState.liveGame.gameQueueConfigId,
                  statsState.liveGame.gameMode
                )}{" "}
                | {getMapName(ddragonState.maps, statsState.liveGame.mapId)} |{" "}
                {liveGameLength(statsState.liveGame.gameLength + gameLength)}
              </p>
              <button
                type="button"
                className={"refresh"}
                onClick={() => getLiveGame(regionState.region, statsState.id)}
              >
                Refresh
              </button>
            </div>
            <div className={"mainContainer"}>IN PROGRESS</div>{" "}
          </div>
        ) : (
          <div className={"searchContainer"}>
            {/* <img alt="404" src={search} className={"searchImage"} /> */}
            <p>{statsState.name} is not in a game</p>
          </div>
        )
      ) : (
        <div className={"searchContainer"}>
          <img alt="404" src={search} className={"searchImage"} />
          <p>Please search for a summoner</p>
        </div>
      )}
    </div>
  );
}

export default connect(mapState, mapDispatch)(LiveGame);
