import React from "react";
import { connect } from "react-redux";
import search from "../assets/search.png";
import LoadingSpinner from "./helpers/LoadingSpinner";
import "../style/LiveGameStyle.css";
import { liveGameLength } from "../util/unixTimeConverter";
import { getChampionName, getQueueType, getMapName } from "../util/formatData";
import { getLiveGame } from "../redux/actions/summonerStatsActions";
import { getSummonerStats } from "../api/LoLGetCalls";
import * as _ from "lodash";

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
  // const [gameLength, setGameLength] = React.useState(0);
  const [blueTeam, setBlueTeam] = React.useState([]);
  const [redTeam, setRedTeam] = React.useState([]);
  let isMobile = width <= 768;

  React.useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    const interval = setInterval(() => {
      if (statsState.liveGame) {
        // setGameLength((gameLength) => gameLength + 1);
        if (blueTeam.length === 0) {
          setBlueTeam(
            _.filter(statsState.liveGame.participants, (x) => x.teamId === 100)
          );
        }
        if (redTeam.length === 0) {
          setRedTeam(
            _.filter(statsState.liveGame.participants, (x) => x.teamId === 200)
          );
        }
      }
    }, 1000);

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      clearInterval(interval);
    };
  }, [isMobile, statsState.liveGame, redTeam, blueTeam]);

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
                )}
                | {getMapName(ddragonState.maps, statsState.liveGame.mapId)} |{" "}
                {liveGameLength(
                  statsState.liveGame.gameLength
                )}
              </p>
              <button
                type="button"
                className={"refresh"}
                onClick={() => getLiveGame(regionState.region, statsState.id)}
              >
                Refresh
              </button>
            </div>
            <div className={"mainContainer"}>
              <table className={"blueOuter"}>
                <thead className={"blueHeader"}>
                  <tr>
                    <th>Blue Team</th>
                    <th>Champion</th>
                    <th>Ranked Winrate</th>
                    <th>Info</th>
                    <th>Division</th>
                    <th>Ban</th>
                  </tr>
                </thead>
                <tbody id={"blueBody"} className={"blueInner"}>
                  {_.map(blueTeam, (x) => {
                    let stats = null;
                    getSummonerStats(
                      regionState.region,
                      x.summonerId
                    ).then(x => console.log(x)); 
                    return (
                      <tr key={x.summonerId}>
                        <td>{x.summonerName}</td>
                        <td>
                          <img
                            className={"champIcon"}
                            alt={"Icon not found"}
                            src={`http://ddragon.leagueoflegends.com/cdn/${
                              ddragonState.version
                            }/img/champion/${getChampionName(
                              ddragonState.champs,
                              x.championId
                            )}.png`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table className={"redOuter"}>
                <thead className={"redHeader"}>
                  <tr>
                    <th>Red Team</th>
                    <th>Champion</th>
                    <th>Ranked Winrate</th>
                    <th>Info</th>
                    <th>Division</th>
                    <th>Ban</th>
                  </tr>
                </thead>
                <tbody id={"redBody"} className={"redInner"}>
                  {_.map(redTeam, (x) => (
                    <tr key={x.summonerId}>
                      <td>{x.summonerName}</td>
                      <td>
                        <img
                          className={"champIcon"}
                          alt={"Icon not found"}
                          src={`http://ddragon.leagueoflegends.com/cdn/${
                            ddragonState.version
                          }/img/champion/${getChampionName(
                            ddragonState.champs,
                            x.championId
                          )}.png`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
