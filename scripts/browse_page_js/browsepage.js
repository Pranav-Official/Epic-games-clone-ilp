import fetchData from "../_functions/rawgfetchGamesdata.js";
import getPrice from "../_functions/getprice.js";
import { API_KEY } from "../../environment.js";

const loadBrowsePage = async (parameterList) => {
  if (parameterList == null) {
    parameterList = [
      ["platforms", "4"],
      ["ordering", "-metacritic"],
    ];
  }

  try {
    const container = document.getElementById("browsepage-game-cards"); // Replace 'game-card-container' with the actual ID or selector for your container
    const data = await fetchData(API_KEY, parameterList);
    container.innerHTML = "";
    for (let i = 0; i < data.results.length; i++) {
      const gameData = data.results[i];

      // const prices = await getPrice(gameData.slug);
      const prices = null;

      let gameCardHTML = ``;
      if (prices === null) {
        gameCardHTML = `
      <div class="game-card">
        <div class="game-card-image">
          <img src="${gameData.background_image}" alt="${gameData.name}" />
        </div>
        <p class="base-game">BASE GAME</p>
        <h3 class="game-card-title">${gameData.name}</h3>
        <div class="game-card-footer">
        </div>
      </div>
    `;
      } else {
        gameCardHTML = `
      <div class="game-card">
        <div class="game-card-image">
          <img src="${gameData.background_image}" alt="${gameData.name}" />
        </div>
        <p class="base-game">BASE GAME</p>
        <h3 class="game-card-title">${gameData.name}</h3>
        <div class="game-card-footer">
          <p class="game-card-discount">-${prices.calculatedDiscount}%</p>
          <h4 class="game-card-previous-price">&#8377;${prices.retailPrice}</h4>
          <h4 class="game-card-current-price">&#8377;${prices.salePrice}</h4>
        </div>
      </div>
    `;
      }

      container.innerHTML += gameCardHTML;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const filterBrowsePageByGenre = (genre) => {
  const parameterList = [
    ["platforms", "4"],
    ["genres", genre],
    ["ordering", "-metacritic"],
  ];
  loadBrowsePage(parameterList);
  // console.log(genre);
};

loadBrowsePage();

document.getElementById("filter_by_action").addEventListener("click", () => {
  filterBrowsePageByGenre("action");
});

document.getElementById("filter_by_indie").addEventListener("click", () => {
  filterBrowsePageByGenre("indie");
});

document.getElementById("filter_by_adventure").addEventListener("click", () => {
  filterBrowsePageByGenre("adventure");
});

document.getElementById("filter_by_rpg").addEventListener("click", () => {
  filterBrowsePageByGenre("rpg");
});

document.getElementById("filter_by_strategy").addEventListener("click", () => {
  filterBrowsePageByGenre("strategy");
});

document.getElementById("filter_by_shooter").addEventListener("click", () => {
  filterBrowsePageByGenre("shooter");
});

document.getElementById("filter_by_casual").addEventListener("click", () => {
  filterBrowsePageByGenre("casual");
});

document.getElementById("filter_by_puzzle").addEventListener("click", () => {
  filterBrowsePageByGenre("puzzle");
});

document.getElementById("filter_by_arcade").addEventListener("click", () => {
  filterBrowsePageByGenre("arcade");
});

document
  .getElementById("filter_by_platformer")
  .addEventListener("click", () => {
    filterBrowsePageByGenre("platformer");
  });

document
  .getElementById("filter_by_massive-multiplayer")
  .addEventListener("click", () => {
    filterBrowsePageByGenre("massive-multiplayer");
  });

document.getElementById("filter_by_racing").addEventListener("click", () => {
  filterBrowsePageByGenre("racing");
});

document.getElementById("filter_by_sports").addEventListener("click", () => {
  filterBrowsePageByGenre("sports");
});

document.getElementById("filter_by_fighting").addEventListener("click", () => {
  filterBrowsePageByGenre("fighting");
});

document.getElementById("filter_by_family").addEventListener("click", () => {
  filterBrowsePageByGenre("family");
});

document
  .getElementById("filter_by_board-games")
  .addEventListener("click", () => {
    filterBrowsePageByGenre("board-games");
  });

document
  .getElementById("filter_by_educational")
  .addEventListener("click", () => {
    filterBrowsePageByGenre("educational");
  });

document.getElementById("filter_by_card").addEventListener("click", () => {
  filterBrowsePageByGenre("card");
});
