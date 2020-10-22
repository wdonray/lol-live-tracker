import React from "react";
import { connect } from "react-redux";
import "../style/StatsStyle.css";
import LoadingSpinner from "./helpers/LoadingSpinner";
import { addStyleArray } from "../util/addStyle";
import search from "../assets/search.png";
import { gameDate, gameLength } from "../util/unixTimeConverter";
import {
  getChampionName,
  getQueueType,
  getSummonerSpell,
} from "../util/formatData";
import {
  showMoreMatches,
  showMore,
} from "../redux/actions/summonerStatsActions";
import ProgressBar from "./helpers/ProgressBar";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
    ddragonState: store.ddragon,
  };
};

let mapDispatch = (dispatch) => {
  return {
    showMore: (value) => dispatch(showMore(value)),
    showMoreMatches: (beginIndex, endIndex) =>
      dispatch(showMoreMatches(beginIndex, endIndex)),
  };
};

let capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function Stats({ statsState, ddragonState, showMore, showMoreMatches }) {
  let [sidePanel, toggleSidePanel] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  let isMobile = width <= 768;

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
                src={`http://ddragon.leagueoflegends.com/cdn/${ddragonState.version}/img/profileicon/${statsState.profileIconId}.png`}
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
              ? `Wins: ${statsState.wins} / Losses: ${statsState.losses}`
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
      if (statsState.updatingMatches) {
        return <p>Loading...</p>;
      }
      return (
        <div>
          <h3>Shown Matches Stats</h3>
          <p>{`Matches: ${statsState.matches.length}`}</p>
          <p>{`Wins: ${statsState.currentMatchesWins} / Losses: ${
            statsState.matches.length - statsState.currentMatchesWins
          }`}</p>
          <ProgressBar
            bgcolor={"#4493c6"}
            progress={Math.round(
              (statsState.currentMatchesWins /
                (statsState.currentMatchesWins +
                  (statsState.endIndex - statsState.currentMatchesWins))) *
                100
            )}
          />
        </div>
      );
    }
    return null;
  };

  let MobilePanel = () => {
    if (statsState.id) {
      return (
        <div className={"mobilePanel"}>
          <div className={"profileIcon"}>
            {statsState.profileIconId ? (
              <img
                className={"profileIconImage"}
                alt={"Icon not found"}
                src={`http://ddragon.leagueoflegends.com/cdn/${ddragonState.version}/img/profileicon/${statsState.profileIconId}.png`}
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
          <p>
            {statsState.queueType
              ? capitalize(statsState.queueType.toLowerCase())
                  .replaceAll("_", " ")
                  .replace("sr", "")
                  .replace("5x5", "")
              : null}
            Rank: {checkIfUnranked()}
          </p>
          <p>
            {statsState.leaguePoints ? `LP: ${statsState.leaguePoints}` : null}
          </p>
          <p>
            {statsState.wins && statsState.losses
              ? `Wins: ${statsState.wins} Losses: ${statsState.losses}`
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

  let MatchCard = ({ match }) => {
    let currentSearched = match.participantIdentities.find(
      (x) => x.player.accountId === statsState.accountId
    );
    let currentParticipant = match.participants.find(
      (x) => x.participantId === currentSearched.participantId
    );
    let kda =
      (currentParticipant.stats.kills + currentParticipant.stats.assists) /
      currentParticipant.stats.deaths;

    let items = [
      currentParticipant.stats.item0,
      currentParticipant.stats.item1,
      currentParticipant.stats.item2,
      currentParticipant.stats.item3,
      currentParticipant.stats.item4,
      currentParticipant.stats.item5,
      currentParticipant.stats.item6,
    ];
    let team100 = match.participants.filter((x) => x.teamId === 100);
    let team200 = match.participants.filter((x) => x.teamId === 200);

    return (
      <div
        className={"matchCard"}
        style={{
          backgroundColor: currentParticipant.stats.win ? "#4493c6" : "#ff726f",
        }}
      >
        <div className={"matchCard-Block"}>
          <p
            style={{
              fontWeight: "bold",
              color: currentParticipant.stats.win ? "#0892d0" : "#f70d1a",
            }}
          >
            {currentParticipant.stats.win ? "Victory" : "Defeat"}
          </p>
          <p style={{ fontSize: "smaller" }}>
            {getQueueType(ddragonState.queues, match.queueId, match.gameMode)}
          </p>
          <div className="bar" />
          <p>{gameDate(match.gameDuration)}</p>
          <p>{gameLength(match.gameDuration)}</p>
        </div>
        <div className={"matchCard-Block"}>
          <div className={"matchCard-Block2"}>
            <div className={"matchCard-SpellContainer"}>
              <img
                className={"matchCard-SpellIcon"}
                alt={"Icon not found"}
                src={`http://ddragon.leagueoflegends.com/cdn/${
                  ddragonState.version
                }/img/spell/${getSummonerSpell(
                  ddragonState.summoners,
                  currentParticipant.spell1Id
                )}.png`}
              />
              <img
                className={"matchCard-SpellIcon"}
                alt={"Icon not found"}
                src={`http://ddragon.leagueoflegends.com/cdn/${
                  ddragonState.version
                }/img/spell/${getSummonerSpell(
                  ddragonState.summoners,
                  currentParticipant.spell2Id
                )}.png`}
              />
            </div>
            <div className={"matchCard-ChampContainer"}>
              <img
                className={"matchCard-ChampIcon"}
                alt={"Icon not found"}
                src={`http://ddragon.leagueoflegends.com/cdn/${
                  ddragonState.version
                }/img/champion/${getChampionName(
                  ddragonState.champs,
                  currentParticipant.championId
                )}.png`}
              />
              <span className={"matchCard-ChampName"}>
                {getChampionName(
                  ddragonState.champs,
                  currentParticipant.championId
                )}
              </span>
            </div>
          </div>
        </div>
        <div className={"matchCard-Block"}>
          <p>{`${currentParticipant.stats.kills}/${currentParticipant.stats.deaths}/${currentParticipant.stats.assists}`}</p>
          <p style={{ opacity: 0.8 }}>{`${
            isFinite(kda) ? kda.toFixed(2) : "Perfect"
          } KDA`}</p>
        </div>
        <div className={"matchCard-Block"}>
          <div className={"matchCard-Items"}>
            {items.map((id) => (
              <div key={id + Math.random()} className={"matchCard-Item"}>
                {id === 0 ? (
                  <div style={{ opacity: id === 0 ? 0 : 1 }} />
                ) : (
                  <img
                    className={"matchCard-ItemIcon"}
                    src={`http://ddragon.leagueoflegends.com/cdn/${ddragonState.version}/img/item/${id}.png`}
                    alt="noItemImage"
                  ></img>
                )}
              </div>
            ))}
          </div>
        </div>
        {isMobile ? null : (
          <div className={"matchCard-Block"}>
            <div className={"matchCard-TeamContainer"}>
              <div className={"matchCard-TeamInfo"}>
                {team100.map((x) => (
                  <div
                    key={x.participantId}
                    className={"matchCard-TeamContainer"}
                  >
                    <img
                      className={"matchCard-TeamChampIcon"}
                      alt={"Icon not found"}
                      src={`http://ddragon.leagueoflegends.com/cdn/${
                        ddragonState.version
                      }/img/champion/${getChampionName(
                        ddragonState.champs,
                        x.championId
                      )}.png`}
                    />
                    <p
                      className={"matchCard-TeamPlayerName"}
                      style={{
                        color: currentParticipant === x ? "gold" : "white",
                      }}
                    >
                      {
                        match.participantIdentities[x.participantId - 1].player
                          .summonerName
                      }
                    </p>
                  </div>
                ))}
              </div>
              <div className={"matchCard-TeamInfo"}>
                {team200.map((x) => (
                  <div
                    key={x.participantId}
                    className={"matchCard-TeamContainer"}
                  >
                    <img
                      className={"matchCard-TeamChampIcon"}
                      alt={"Icon not found"}
                      src={`http://ddragon.leagueoflegends.com/cdn/${
                        ddragonState.version
                      }/img/champion/${getChampionName(
                        ddragonState.champs,
                        x.championId
                      )}.png`}
                    />
                    <p
                      className={"matchCard-TeamPlayerName"}
                      style={{
                        color: currentParticipant === x ? "gold" : "white",
                      }}
                    >
                      {
                        match.participantIdentities[x.participantId - 1].player
                          .summonerName
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  React.useEffect(() => {
    if (!sidePanel) {
      togglePanelOn();
    }

    if (isMobile || statsState.loading) {
      togglePanelOff();
    }

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [statsState, sidePanel, isMobile]);

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
        {isMobile ? <MobilePanel /> : null}
        {statsState.matches
          ? statsState.matches.map((match) => (
              <MatchCard
                match={match}
                key={match.gameId.toString().concat(match.gameCreation)}
              />
            ))
          : null}
        <button
          className="showMore"
          disabled={statsState.maxMatches}
          onClick={() => {
            showMore(statsState.endIndex + 6);
            showMoreMatches();
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
