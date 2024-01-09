import { API_KEY } from "../../environment.js";

async function fetchGameData(gameSlug) {
  const baseUrl =
    "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
  console.log(baseUrl);
  const response = await axios.get(baseUrl);
  return response.data;
}

export default fetchGameData;
