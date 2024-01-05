import { API_KEY } from "../../environment.js";
const apiKey = API_KEY;
const baseURL = "https://api.rawg.io/api/";

//function to fetch data for single game from rawg
export const fetchSingleGameData = async (gameSlug) => {
  try {
    const response = await axios.get(
      `${baseURL}games/${gameSlug}?key=${apiKey}`
    );
    const gameData = response.data;
    console.log(gameData); // Log the data here
    return gameData;
  } catch (error) {
    throw error;
  }
};
//function to fetch additonal screenshots
export const fetchGameScreenShots = async (gameSlug) => {
  try {
    const response = await axios.get(
      `${baseURL}games/${gameSlug}/screenshots?key=${apiKey}`
    );
    const gameScreenShotData = response.data;
    console.log(gameScreenShotData); // Log the data here
    return gameScreenShotData;
  } catch (error) {
    throw error;
  }
};

//function to fetch additonal screenshots
export const fetchGameAchievements = async (gameSlug, pageNumber) => {
  try {
    const response = await axios.get(
      `${baseURL}games/${gameSlug}/achievements?key=${apiKey}&page${pageNumber}`
    );
    const AchievementsData = response.data;
    console.log(AchievementsData); // Log the data here
    return AchievementsData;
  } catch (error) {
    throw error;
  }
};

//function to fetch Thumbnail image
export const fetchGameThumbImage = async (gameSlug) => {
  try {
    const cheapSharkUrl = "https://www.cheapshark.com/api/1.0/games?title";
    const response = await axios.get(`${cheapSharkUrl}=${gameSlug}`);
    const cheapShark = response.data;
    return cheapShark;
  } catch (error) {
    throw error;
  }
};
