export const gameLength = (seconds) => {
  return new Date(seconds * 1000)
    .toISOString()
    .substr(11, 8)
    .replace("00:", "").replace(':', 'm ').concat('s');
};

export const gameDate = (unixTime) => {
  return new Date(unixTime).toLocaleDateString("en-US");
};

export const liveGameLength = (seconds) => {
  return new Date(seconds * 1000)
    .toISOString()
    .substr(11, 8)
    .replace("00:", "").replace(':', ':');
};