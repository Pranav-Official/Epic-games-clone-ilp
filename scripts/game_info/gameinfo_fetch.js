import { API_KEY } from "../../environment.js";
const apiKey = API_KEY;
const baseURL = "https://api.rawg.io/api/";

//static for now
let gameSlug = "grand-theft-auto-v";

//function to fetch data for single game from rawg
const fetchSingleGameData = async () => {
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
//function to fetch additonal s
export const fetchGameScreenShots = async () => {
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



export default fetchSingleGameData;
