import axios from "axios";
const apiKey = "c743276cb3944c4ead359796d7c95793";
const baseURL = "https://api.rawg.io/api/";

const gameId = "3498";

axios
  .get(`${baseURL}games/${gameId}?key=${apiKey}`)
  .then((response) => {
    // Handle the successful response
    const gameData = response.data;
    console.log(gameData);
  })
  .catch((error) => {
    // Handle errors
    console.error("Error fetching game details:", error);
  });
