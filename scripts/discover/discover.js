import fetchData from "../_functions/rawgfetchGamesdata.js";
import getPrice from "../_functions/getprice.js";
import { API_KEY } from "../../environment.js";

const logAPidata = async () => {
  let parameterList = [
    ["metacritic", "95", "100"],
    ["ordering", "-released"],
  ];

  try {
    const data = await fetchData(API_KEY, parameterList);
    console.log(data["results"]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// logAPidata();

const bestGamesOf2023 = async () => {
  let parameterList = [
    ["metacritic", "75", "100"],
    ["platforms", "4"],
    ["dates", "2022-11-01,2023-12-30"],
  ];

  try {
    const data = await fetchData(API_KEY, parameterList);
    const gameCardsContainer = document.getElementById(
      "bestof2023-highlights-game-cards"
    );

    // Check if there are at least 5 results
    if (data["results"].length >= 5) {
      // Loop through the first 5 results and update the game cards
      for (let i = 0; i < 5; i++) {
        const gameCard =
          gameCardsContainer.getElementsByClassName("game-card")[i];

        // Update game card content with fetched data
        gameCard.querySelector(".game-card-image img").src =
          data["results"][i].background_image;
        gameCard.querySelector(".base-game").textContent = "BASE GAME";
        gameCard.querySelector(".game-card-title").textContent =
          data["results"][i].name;
        let prices = await getPrice(data["results"][i].slug);
        console.log(prices);
        gameCard.querySelector(".game-card-discount").textContent =
          "-" + Math.trunc(prices.calculatedDiscount) + "%"; // You may need to update this value
        gameCard.querySelector(".game-card-previous-price").textContent =
          "₹" + prices.retailPrice; // You may need to update this value
        gameCard.querySelector(".game-card-current-price").textContent =
          "₹" + prices.salePrice; // You may need to update this value
      }
    } else {
      console.error("Insufficient data to update game cards.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// const reecentlyUpadatedList = async () => {
//   let parameterList = [
//     ["platforms", "4"],
//     ["ordering", "-updated"],
//   ];

//   try {
//     const data = await fetchData(API_KEY, parameterList);
//     const gameCardsContainer = document.getElementById(
//       "recentlyUpadated-highlights-game-cards"
//     );

//     // Check if there are at least 5 results
//     if (data["results"].length >= 5) {
//       // Loop through the first 5 results and update the game cards
//       for (let i = 0; i < 5; i++) {
//         const gameCard =
//           gameCardsContainer.getElementsByClassName("game-card")[i];

//         // Update game card content with fetched data
//         gameCard.querySelector(".game-card-image img").src =
//           data["results"][i].background_image;
//         gameCard.querySelector(".base-game").textContent = "BASE GAME";
//         if (data["results"][i].name.length > 20) {
//           gameCard.querySelector(".game-card-title").textContent =
//             data["results"][i].name.slice(0, 20) + "...";
//         } else {
//           gameCard.querySelector(".game-card-title").textContent =
//             data["results"][i].name;
//         }
//         let prices = await getPrice(data["results"][i].name);
//         if (prices === null) {
//           prices = {
//             salePrice: "",
//             retailPrice: "",
//             calculatedDiscount: "",
//           };
//         }
//         console.log(prices);
//         gameCard.querySelector(".game-card-discount").textContent =
//           "-" + Math.trunc(prices.calculatedDiscount) + "%"; // You may need to update this value
//         gameCard.querySelector(".game-card-previous-price").textContent =
//           "₹" + prices.retailPrice; // You may need to update this value
//         gameCard.querySelector(".game-card-current-price").textContent =
//           "₹" + prices.salePrice; // You may need to update this value
//       }
//     } else {
//       console.error("Insufficient data to update game cards.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// const recentlyReleasedList = async () => {
//   let parameterList = [
//     ["platforms", "4"],
//     ["ordering", "-released"],
//   ];

//   const node = document.getElementsByClassName("sale-highlights");
//   const sales_highlights_copy = node.cloneNode(true);

//   sales_highlights_copy.querySelector(".sale-title h1").textContent =
//     "Recently Released";
//   sales_highlights_copy
//     .querySelector(".game-cards-container")
//     .setAttribute("id", "recentlyReleased-highlights-game-cards");

//   document
//     .getElementsByClassName("body-container")[0]
//     .appendChild(sales_highlights_copy);

//   try {
//     const data = await fetchData(API_KEY, parameterList);
//     const gameCardsContainer = document.getElementById(
//       "recentlyReleased-highlights-game-cards"
//     );

//     // Check if there are at least 5 results
//     if (data["results"].length >= 5) {
//       // Loop through the first 5 results and update the game cards
//       for (let i = 0; i < 5; i++) {
//         const gameCard =
//           gameCardsContainer.getElementsByClassName("game-card")[i];

//         // Update game card content with fetched data
//         gameCard.querySelector(".game-card-image img").src =
//           data["results"][i].background_image;
//         gameCard.querySelector(".base-game").textContent = "BASE GAME";
//         gameCard.querySelector(".game-card-title").textContent =
//           data["results"][i].name.slice(0, 10) + "...";
//         let prices = await getPrice(data["results"][i].name);
//         console.log(prices);
//         if (prices === null) {
//           gameCard.querySelector(".game-card-discount").textContent = "";
//           gameCard.querySelector(".game-card-previous-price").textContent = "";
//           gameCard.querySelector(".game-card-current-price").textContent = "";
//         }
//         gameCard.querySelector(".game-card-discount").textContent =
//           "-" + Math.trunc(prices.calculatedDiscount) + "%"; // You may need to update this value
//         gameCard.querySelector(".game-card-previous-price").textContent =
//           "₹" + prices.retailPrice; // You may need to update this value
//         gameCard.querySelector(".game-card-current-price").textContent =
//           "₹" + prices.salePrice; // You may need to update this value
//       }
//     } else {
//       console.error("Insufficient data to update game cards.");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

const appedSalesHighlights = async (id) => {
  const node = document.getElementsByClassName("sale-highlights")[0];
  const sales_highlights_copy = node.cloneNode(true);
  sales_highlights_copy.setAttribute("id", id);
  sales_highlights_copy
    .querySelector(".game-cards-container")
    .setAttribute("id", id + "-game-cards");
  node.parentNode.appendChild(sales_highlights_copy);
  console.log(sales_highlights_copy);
};

const populateSalesHighlights = async (title, id, parameterList) => {
  appedSalesHighlights(id);
  let highlightContainer = document.getElementById(id);

  highlightContainer.querySelector(".sale-title h1").textContent = title;

  try {
    const data = await fetchData(API_KEY, parameterList);
    let gameCardsContainer = document.getElementById(id + "-game-cards");

    // Check if there are at least 5 results
    if (data["results"].length >= 5) {
      // Loop through the first 5 results and update the game cards
      for (let i = 0; i < 5; i++) {
        const gameCard =
          gameCardsContainer.getElementsByClassName("game-card")[i];

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
        // let prices = await getPrice(data["results"][i].slug);
        let prices = null;
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
      }
    } else {
      console.error("Insufficient data to update game cards.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

bestGamesOf2023();
// reecentlyUpadatedList();
// recentlyReleasedList();
// appedSalesHighlights("recentlyReleased-highlights");

populateSalesHighlights("Top Rated", "topRated-highlights", [
  ["platforms", "4"],
  ["ordering", "-metacritic"],
]);

populateSalesHighlights("Recently Updated", "recentlyUpdated-highlights", [
  ["platforms", "4"],
  ["ordering", "-updated"],
]);
populateSalesHighlights("Recently Released", "recentlyReleased-highlights", [
  ["platforms", "4"],
  ["ordering", "-released"],
]);
