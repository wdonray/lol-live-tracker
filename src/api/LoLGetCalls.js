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

export let getMatchHistory = async (region, encryptedAccountId, endIndex) => {
  try {
    const { data } = await axios.post(endPoints.getMatchHistory, {
      region: region,
      encryptedAccountId: encryptedAccountId,
      count: endIndex,
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
