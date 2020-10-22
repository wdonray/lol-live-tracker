import axios from "axios";

export const endPoints = {
  getSummonerByName:
    "https://kgbyg1p6di.execute-api.us-east-1.amazonaws.com/dev/getSummonerByName",
  getMatchHistory:
    "https://kgbyg1p6di.execute-api.us-east-1.amazonaws.com/dev/getMatchHistory",
  getActiveGame:
    "https://kgbyg1p6di.execute-api.us-east-1.amazonaws.com/dev/getActiveGame",
  getSummonerStats:
    "https://kgbyg1p6di.execute-api.us-east-1.amazonaws.com/dev/getSummonerStats",
};

export let getSummonerByName = async (region, summonerName) => {
  try {
    const { data } = await axios.post(endPoints.getSummonerByName, {
      region: region,
      summonerName: summonerName,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export let getMatchHistory = async (
  region,
  encryptedAccountId,
  beginIndex,
  endIndex
) => {
  try {
    const { data } = await axios.post(endPoints.getMatchHistory, {
      region: region,
      encryptedAccountId: encryptedAccountId,
      beginIndex: beginIndex.toString(),
      endIndex: endIndex,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export let getActiveGame = async (region, encryptedSummonerId) => {
  try {
    const { data } = await axios.post(endPoints.getActiveGame, {
      region: region,
      encryptedSummonerId: encryptedSummonerId,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export let getSummonerStats = async (region, encryptedSummonerId) => {
  try {
    const { data } = await axios.post(endPoints.getSummonerStats, {
      region: region,
      encryptedSummonerId: encryptedSummonerId,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export let getVersions = async () => {
  try {
    const { data } = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    return data[0];
  } catch (err) {
    return err;
  }
};

export let getChamps = async (version) => {
  try {
    const { data } = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );
    return data.data;
  } catch (err) {
    return err;
  }
};

export let getQueues = async () => {
  try {
    const { data } = await axios.get(
      "https://static.developer.riotgames.com/docs/lol/queues.json"
    );
    return data;
  } catch (err) {
    return err;
  }
};

export let getSummoners = async (version) => {
  try {
    const { data } = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
    );
    return data.data;
  } catch (err) {
    return err;
  }
};
