import fetchData from "./rawgfetchGamesdata.js";
import getPrice from "./getprice.js";
import { API_KEY } from "../environment.js";

const loadBrowsePage = async () => {
  const browsepage_gamecards = document.getElementById("browsepage-game-cards");
  const node = browsepage_gamecards.querySelector(".game-card");
  const gamesCardCopy = node.cloneNode(true);
  //   browsepage_gamecards.innerHTML = "";
  const parameterList = [
    ["platforms", "4"],
    ["ordering", "-metacritic"],
  ];

  try {
    const data = await fetchData(API_KEY, parameterList);

    // Check if there are at least 5 results
    if (data["results"].length > 0) {
      // Loop through the first 5 results and update the game cards
      for (let i = 0; i < data["results"].length; i++) {
        const gameCard =
          browsepage_gamecards.getElementsByClassName("game-card")[i];

        // Update game card content with fetched data
        gameCard.querySelector(".game-card-image img").src =
          data["results"][i].background_image;
        gameCard.querySelector(".base-game").textContent = "BASE GAME";
        if (data["results"][i].name.length > 20) {
          gameCard.querySelector(".game-card-title").textContent =
            data["results"][i].name.slice(0, 20) + "...";
        } else {
          gameCard.querySelector(".game-card-title").textContent =
            data["results"][i].name;
        }
        let prices = await getPrice(data["results"][i].slug);
        // let prices = null;
        if (prices === null) {
          gameCard.querySelector(".game-card-discount").remove(); // You may need to update this value
          gameCard.querySelector(".game-card-previous-price").remove(); // You may need to update this value
          gameCard.querySelector(".game-card-current-price").remove(); // You may need to update this value
        } else {
          console.log(prices);
          gameCard.querySelector(".game-card-discount").textContent =
            "-" + Math.trunc(prices.calculatedDiscount) + "%"; // You may need to update this value
          gameCard.querySelector(".game-card-previous-price").textContent =
            "₹" + prices.retailPrice; // You may need to update this value
          gameCard.querySelector(".game-card-current-price").textContent =
            "₹" + prices.salePrice; // You may need to update this value
        }
        browsepage_gamecards.appendChild(gameCard);
      }
    } else {
      console.error("Insufficient data to update game cards.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
loadBrowsePage();
