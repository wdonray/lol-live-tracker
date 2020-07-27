import axios from "axios";

export let getSummonerByName = async (summonerName) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      params: {
        api_key: '',
      },
    });
    return data;
  } catch (err) {
    throw new Error("Failed to fetch summoner by summonerName");
  }
};
