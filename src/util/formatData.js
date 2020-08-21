let capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export let formatGameMode = (gameMode) => {
  switch (gameMode) {
    case "DOOMBOTSTEEMO": {
      return "Doom Bots";
    }
    case "ONEFORALL": {
      return "One For All";
    }
    case "FIRSTBLOOD": {
      return "Snowdown Showdown";
    }
    case "KINGPORO": {
      return "King Poro";
    }
    case "STARGUARDIAN": {
      return "Star Guardian";
    }
    case "NEXUSBLITZ": {
      return "Nexus Blitz";
    }
    default:
      return capitalize(gameMode.toLowerCase());
  }
};

export let getChampionName = (champs, champId) => {
  return champs.find((x) => x.key === champId.toString()).id;
};

export let getQueueType = (queues, queueId, gameMode) => {
  let foundQueue = queues.find((x) => x.queueId === queueId);
  if (!foundQueue) {
    return formatGameMode(gameMode);
  }
  return foundQueue.description.replace(" games", "");
};

export let getSummonerSpell = (summoners, spellId) => {
  return summoners.find((x) => x.key === spellId.toString()).id;
}