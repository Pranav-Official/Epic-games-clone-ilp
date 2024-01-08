import fetchData from "../_functions/rawgfetchGamesdata.js";
import getPrice from "../_functions/getprice.js";
import fetchGenre from "../_functions/rawgfetchGamesGenre.js";
import { API_KEY } from "../../environment.js";
let next_page, prev_page;

const loadBrowsePage = async (parameterList = []) => {
  // console.log("testing", parameterList);
  if (parameterList == null || undefined) {
    parameterList = [
      ["platforms", "4"],
      ["ordering", "-metacritic"],
    ];
  }

  try {
    const container = document.getElementById("browsepage-game-cards"); // Replace 'game-card-container' with the actual ID or selector for your container
    const data = await fetchData(API_KEY, parameterList);
    // console.log(data);
    next_page = data.next;
    prev_page = data.previous;
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

const filterBrowsePageByFeatures = (feature) => {
  const parameterList = [
    ["platforms", "4"],
    ["tags", feature],
    ["ordering", "-metacritic"],
  ];
  loadBrowsePage(parameterList);
  console.log(feature);
};

document.getElementById("filter_by_sp").addEventListener("click", () => {
  filterBrowsePageByFeatures("singleplayer");
});

document.getElementById("filter_by_sa").addEventListener("click", () => {
  filterBrowsePageByFeatures("steam-achievements");
});

document.getElementById("filter_by_mp").addEventListener("click", () => {
  filterBrowsePageByFeatures("multiplayer");
});

document.getElementById("filter_by_fcsupport").addEventListener("click", () => {
  filterBrowsePageByFeatures("full-controller-support");
});

document
  .getElementById("filter_by_steamcloud")
  .addEventListener("click", () => {
    filterBrowsePageByFeatures("steam-cloud");
  });

document
  .getElementById("filter_by_atmospheric")
  .addEventListener("click", () => {
    filterBrowsePageByFeatures("atmospheric");
  });

document
  .getElementById("filter_by_stradingcards")
  .addEventListener("click", () => {
    filterBrowsePageByFeatures("steam-trading-cards");
  });

document
  .getElementById("filter_by_greatsoundtrack")
  .addEventListener("click", () => {
    filterBrowsePageByFeatures("great-soundtrack");
  });

document.getElementById("filter_by_rpg").addEventListener("click", () => {
  filterBrowsePageByFeatures("rpg");
});

document.getElementById("filter_by_coop").addEventListener("click", () => {
  filterBrowsePageByFeatures("co-op");
});

const genreTemplate = (genreData) => {
  return `
    <div class="action-games">
      <div class="images-container">
        <div class="img1"><img src="${genreData.image1}" /></div>
      </div>
      <p class="actgame-text">${genreData.name} Games</p>
    </div>`;
};

const genreDisplay = async () => {
  try {
    const genreData = await fetchGenre(API_KEY);
    const genreList = genreData.results;
    const genreContainerList = document.getElementsByClassName("action-games");

    for (let i = 0; i < genreContainerList.length; i++) {
      const genreCard = genreContainerList[i];

      // Add click event listener to each genre container
      genreCard.addEventListener("click", () => {
        // Call a function to update the game cards based on the clicked genreData
        updateGameCardsByGenre(genreList[currentIndex + i]);
      });

      // Check if there is corresponding data for the current index
      if (i < genreList.length) {
        const currentGenreData = genreList[i];

        // Update the image and text for the current genre card
        genreCard.getElementsByClassName("img1")[0].querySelector("img").src =
          currentGenreData["image_background"];
        genreCard.querySelector("p").innerHTML =
          currentGenreData["name"] + " Games";
      } else {
        // If there is no corresponding data, you might want to hide or clear the genre card
        genreCard.style.display = "none"; // Or use another method to hide the card
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

let selectedGenre = null; // Initialize selectedGenre
// Define a variable to keep track of the current page
let currentPage = 1;

// Update the updateGameCardsByGenre function to include the page parameter
const updateGameCardsByGenre = async (selectedGenre) => {
  try {
    // Fetch game data based on the selected genre or implement your logic
    const parameterList = [
      ["platforms", "4"],
      ["genres", selectedGenre.slug],
      ["ordering", "-metacritic"],
    ];

    const container = document.getElementById("browsepage-game-cards");
    const data = await fetchData(API_KEY, parameterList);
    container.innerHTML = "";

    for (let i = 0; i < data.results.length; i++) {
      const gameData = data.results[i];
      const prices = await getPrice(gameData.slug);
      // const prices = null;
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

const refreshData = async (gameDataUrl) => {
  try {
    const container = document.getElementById("browsepage-game-cards"); // Replace 'game-card-container' with the actual ID or selector for your container
    const response = await axios.get(gameDataUrl);
    const data = response.data;
    // console.log(data);
    next_page = data.next;
    prev_page = data.previous;
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
const nextPage = () => {
  currentPage++;
  refreshData(next_page);
  // console.log(currentPage);
  updatePageButton();
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    refreshData(prev_page);
    // console.log(currentPage);
    updatePageButton();
  }
};

const updatePageButton = () => {
  const pageButton = document.getElementById("currentPageButton");
  if (pageButton) {
    pageButton.textContent = currentPage.toString();
  }
};

document.getElementById("next_Page").addEventListener("click", nextPage);

document.getElementById("prev_Page").addEventListener("click", prevPage);

updatePageButton();
// Call the genreDisplay function to set up event listeners for genres
genreDisplay();

let currentIndex = 0;
const genreData = await fetchGenre(API_KEY);
const genreList = genreData.results;
const genreContainerList = document.getElementsByClassName("action-games");

const replaceGenreDisplay = async () => {
  try {
    for (let i = 0; i < genreContainerList.length; i++) {
      const genreCard = genreContainerList[i];
      const genreIndex = (currentIndex + i) % genreList.length;

      genreCard.getElementsByClassName("img1")[0].querySelector("img").src =
        genreList[genreIndex]["image_background"];
      genreCard.querySelector("p").innerHTML =
        genreList[genreIndex]["name"] + " Games";
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call the function when the page loads
replaceGenreDisplay();

const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");

// Event listener for the left button
leftButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 4 + genreList.length) % genreList.length;
  replaceGenreDisplay();
  leftButton.classList.add("active");
  rightButton.classList.remove("active");
});

// Event listener for the right button
rightButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 4) % genreList.length;
  replaceGenreDisplay();
  leftButton.classList.remove("active");
  rightButton.classList.add("active");
});

// Event listener for clicks outside the buttons
document.addEventListener("click", (event) => {
  const isOutsideButtons =
    !event.target.closest(".leftButton") &&
    !event.target.closest(".rightButton");

  if (isOutsideButtons) {
    leftButton.classList.remove("active");
    rightButton.classList.remove("active");
  }
});

const filterByQuery = () => {
  const searchField = document.getElementById("search-field");
  const inputValue = searchField.value;

  // Now, 'inputValue' contains the value from the input field
  console.log(inputValue);
  const parameterList = [
    ["platforms", "4"],
    ["ordering", "-metacritic"],
    ["search", inputValue],
  ];
  loadBrowsePage(parameterList);
};

// const handleSearch = () => {
//   console.log("test search");
// };

// Reset Button Click Event

document.getElementById("resetButton").addEventListener("click", () => {
  loadBrowsePage();
});

document
  .getElementById("search-fields-2")
  .addEventListener("keydown", (event) => {
    let searchField = document.getElementById("search-fields-2");
    if (event.key === "Enter") {
      console.log("Enter key pressed - perform search");
      // Add your search logic here
      console.log("Input text:", searchField.value);
      const parameterList = [
        ["platforms", "4"],
        ["ordering", "-metacritic"],
        ["search", searchField.value],
      ];
      loadBrowsePage(parameterList);
      searchField.value = "";
    }
  });

// document.addEventListener("DOMContentLoaded", function () {
//   const featureButtons = document.querySelectorAll(".feature-button");

//   featureButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       // Remove the 'selected-button' class from all buttons
//       featureButtons.forEach((btn) => btn.classList.remove("selected-button"));

//       // Add the 'selected-button' class to the clicked button
//       button.classList.add("selected-button");
//     });
//   });
// });

const filterBrowsePageByPlatform = (platform) => {
  const parameterList = [
    ["platforms", platform], // Use the actual value of the 'platform' parameter
    ["ordering", "-metacritic"],
  ];
  loadBrowsePage(parameterList);
  // console.log(genre);
};

// Assuming loadBrowsePage is defined somewhere in your code

document.getElementById("filter_by_windows").addEventListener("click", () => {
  filterBrowsePageByPlatform("4");
});

document.getElementById("filter_by_macos").addEventListener("click", () => {
  filterBrowsePageByPlatform("5");
});
