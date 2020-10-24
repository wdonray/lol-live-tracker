import React from "react";
import { connect } from "react-redux";
import search from "../assets/search.png";
import LoadingSpinner from "./helpers/LoadingSpinner";
import "../style/LiveGameStyle.css";
import {
  getChampionName,
  getQueueType,
  getSummonerSpell,
} from "../util/formatData";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
    ddragonState: store.ddragon,
  };
};

function LiveGame({ statsState, ddragonState }) {
  console.log(statsState.liveGame);
  const [width, setWidth] = React.useState(window.innerWidth);
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
        style={{ opacity: statsState.liveGame ? 1 : 0 }}
        className={"playerBanner"}
      >
        {/* <button className={'refresh'}>Refresh</button> */}
      </div>
      <div
        style={{ opacity: statsState.liveGame ? 1 : 0 }}
        className={"mainContainer"}
      >
        IN PROGRESS
      </div>
    </div>
  );
}

export default connect(mapState)(LiveGame);
