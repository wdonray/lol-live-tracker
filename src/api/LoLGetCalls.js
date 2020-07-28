import axios from "axios";

export const endPoints = {
  getSummonerByName:
    "https://kgbyg1p6di.execute-api.us-east-1.amazonaws.com/dev/getSummonerByName",
};

export let getSummonerByName = async (region, summonerName) => {
  try {
    const { data } = await axios.post(endPoints.getSummonerByName, {
      region: region,
      summonerName: summonerName,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
