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
import axios from "axios";

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
  const [width, setWidth] = React.useState(window.innerWidth);
  const [teams, setTeams] = React.useState({});
  let isMobile = width <= 768;

  React.useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    async function fetchData() {
      const getTeam = (teamNumber) =>
        _.filter(
          _.map(statsState.liveGame.participants, (x) => {
            if (x.teamId === teamNumber) {
              return {
                stats: getSummonerStats(regionState.region, x.summonerId),
                gameData: x,
              };
            }
          }),
          (x) => x !== undefined
        );

      let blueTeam = getTeam(100);
      let redTeam = getTeam(200);

      let blueResp = await axios
        .all(_.map(blueTeam, (x) => x.stats))
        .catch((err) => console.log(err));
      let redResp = await axios
        .all(_.map(redTeam, (x) => x.stats))
        .catch((err) => console.log(err));
      console.log(blueResp, redResp);

      setTeams((prevState) => ({
        ...prevState,
        blue: blueTeam,
        red: redTeam,
      }));
    }

    if (statsState.liveGame && _.isEmpty(teams)) {
      fetchData();
    }

    console.log(teams);

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [isMobile, statsState.liveGame, teams, regionState]);

  return (
    <div style={{ color: "white" }}>
      {statsState.loading ? (
        <LoadingSpinner />
      ) : statsState.id ? (
        _.isEmpty(teams) ? (
          <div>
            <div className={"playerBanner"}>
              <p>
                {getQueueType(
                  ddragonState.queues,
                  statsState.liveGame.gameQueueConfigId,
                  statsState.liveGame.gameMode
                )}
                | {getMapName(ddragonState.maps, statsState.liveGame.mapId)} |{" "}
                {liveGameLength(statsState.liveGame.gameLength)}
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
                  {_.map(teams.blue, (x) => (
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
                  {_.map(teams.red, (x) => (
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
