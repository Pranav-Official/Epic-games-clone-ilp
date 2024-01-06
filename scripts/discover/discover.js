import fetchData from "../rawgfetchGamesdata.js";
import getPrice from "../getprice.js";
import { API_KEY } from "../../environment.js";
import fetchCarousalData from "../carousal-data-fetch.js";

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
    ["platforms", "4"],
    ["developers", "epic-games"],
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
        gameCard.setAttribute("data-slug", data["results"][i].slug);

        // Update game card content with fetched data
        gameCard.querySelector(".game-card-image img").src =
          data["results"][i].background_image;
        gameCard.querySelector(".base-game").textContent = "BASE GAME";
        gameCard.querySelector(".game-card-title").textContent =
          data["results"][i].name;
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

const addGameCardsToSwipers = () => {
  const swiperContainers = document.querySelectorAll(
    ".swiper-highlights-container .swiper-wrapper .swiper-slide"
  );

  for (let i = 0; i < swiperContainers.length; i++) {
    const currentContainer = swiperContainers[i];
    console.log(currentContainer);
    currentContainer.innerHTML = "";
    // Add 5 game cards to each swiper
    for (let j = 0; j < 5; j++) {
      const gameCard = `<div class="game-card">
            <div class="game-card-image">
              <div class="game-card-hover-effect"></div>
              <img src="../assets/discover-page/null.png.png" alt="" />
            </div>
            <p class="base-game">BASE GAME</p>
            <h3 class="game-card-title"></h3>
            <div class="game-card-footer">
              <p class="game-card-discount"></p>
              <h4 class="game-card-previous-price"></h4>
              <h4 class="game-card-current-price"></h4>
            </div>
          </div>`;
      currentContainer.innerHTML += gameCard;
      // currentContainer.appendChild(gameCard);
    }
  }
};

const swiperHighlightsPopulator = async () => {
  let parameterList = [
    ["metacritic", "75", "100"],
    ["platforms", "4"],
    ["dates", "2022-11-01,2023-12-30"],
  ];

  addGameCardsToSwipers();
  try {
    const data = await fetchData(API_KEY, parameterList);
    const gameCardsContainers = document.querySelectorAll(
      ".swiper-highlights-container .swiper-wrapper .swiper-slide"
    );

    // Check if there are at least 15 results
    if (data["results"].length >= 15) {
      // Loop through each swiper container and update the game cards
      for (let i = 0; i < gameCardsContainers.length; i++) {
        const currentContainer = gameCardsContainers[i];

        // Loop through 5 results for each swiper
        for (let j = 0; j < 5; j++) {
          const gameCard =
            currentContainer.getElementsByClassName("game-card")[j];
          gameCard.setAttribute("data-slug", data["results"][i * 5 + j].slug);

          // Update game card content with fetched data
          gameCard.querySelector(".game-card-image img").src =
            data["results"][i * 5 + j].background_image;
          gameCard.querySelector(".base-game").textContent = "BASE GAME";
          gameCard.querySelector(".game-card-title").textContent =
            data["results"][i * 5 + j].name;
          // let prices = await getPrice(data["results"][i * 5 + j].slug);
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
      }
    } else {
      console.error("Insufficient data to update game cards.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

swiperHighlightsPopulator();

const appedSalesHighlights = async (id) => {
  const node = document.getElementsByClassName("sale-highlights")[0];
  const sales_highlights_copy = node.cloneNode(true);
  sales_highlights_copy.setAttribute("id", id);
  sales_highlights_copy
    .querySelector(".game-cards-container")
    .setAttribute("id", id + "-game-cards");
  // node.parentNode.appendChild(sales_highlights_copy);
  node.parentNode.insertBefore(
    sales_highlights_copy,
    document.querySelector(".end-event-container")
  );
  // console.log(sales_highlights_copy);
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
        gameCard.setAttribute("data-slug", data["results"][i].slug);

        // Update game card content with fetched data
        if (data["results"][i].background_image == null) {
          gameCard.querySelector(".game-card-image img").src =
            "../../assets/no-image-available.png";
        } else {
          gameCard.querySelector(".game-card-image img").src =
            data["results"][i].background_image;
        }
        gameCard.querySelector(".base-game").textContent = "BASE GAME";
        if (data["results"][i].name.length > 25) {
          gameCard.querySelector(".game-card-title").textContent =
            data["results"][i].name.slice(0, 25) + "...";
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

const populateTrippleList = async (title, id, parameterList) => {
  let trippleListContainer = document.getElementById(id);

  trippleListContainer.querySelector(".tripple-list-title h3").textContent =
    title;

  let trippleListItemsContainer = trippleListContainer.querySelector(
    ".tripple-list-items"
  );

  // Remove existing tripple items if any
  trippleListItemsContainer.innerHTML = "";

  try {
    const data = await fetchData(API_KEY, parameterList);

    // Loop through the first 5 results and create new tripple items
    for (let i = 0; i < 5; i++) {
      // Create a new tripple item
      const trippleItem = document.createElement("div");
      trippleItem.classList.add("tripple-item");

      // Add content to the tripple item
      trippleItem.setAttribute("data-slug", data["results"][i].slug);
      trippleItem.innerHTML = `
        <div class="tripple-item-image">
          <img src="${data["results"][i].background_image}" />
        </div>
        <div class="tripple-item-text">
          <h4>${
            data["results"][i].name.length > 25
              ? data["results"][i].name.slice(0, 25) + "..."
              : data["results"][i].name
          }</h4>
          <div class="game-card-footer">
            <p class="game-card-discount"></p>
            <h4 class="game-card-previous-price"></h4>
            <h4 class="game-card-current-price"></h4>
          </div>
        </div>
      `;

      // Append the tripple item to the container
      trippleListItemsContainer.appendChild(trippleItem);

      // Fetch prices
      // let prices = await getPrice(data["results"][i].slug);
      let prices = null;

      // Check if prices are available
      if (prices !== null) {
        trippleItem.querySelector(".game-card-discount").textContent =
          "-" + Math.trunc(prices.calculatedDiscount) + "%";
        trippleItem.querySelector(".game-card-previous-price").textContent =
          "₹" + prices.retailPrice;
        trippleItem.querySelector(".game-card-current-price").textContent =
          "₹" + prices.salePrice;
      } else {
        // If prices are not available, you may want to handle it accordingly
        trippleItem.querySelector(".game-card-discount").remove();
        trippleItem.querySelector(".game-card-previous-price").remove();
        trippleItem.querySelector(".game-card-current-price").remove();
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const swiper = new Swiper(".feature-games-carousal", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperHighlights = new Swiper(".highlights-swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,

  // If we need pagination
  // pagination: {
  //   el: ".swiper-pagination",
  // },

  // Navigation arrows
  navigation: {
    nextEl: ".hightlight-change-next",
    prevEl: ".hightlight-change-prev",
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: ".swiper-scrollbar",
  // },
});

function changeSwiperSlide() {
  swiper.slideNext(); // Change to the next slide
}

// Set interval to change the swiper slide every 10 seconds
let intervalId = setInterval(changeSwiperSlide, 5000);

// Listen for the transitionEnd event to reset the timer
swiper.on("transitionEnd", function () {
  clearInterval(intervalId); // Clear the previous interval
  intervalId = setInterval(changeSwiperSlide, 5000); // Set a new interval
});

function logCurrentSlideId() {
  const activeSlideId = swiper.slides[swiper.activeIndex].id;
  // console.log("Current Active Slide ID:", activeSlideId);
  const icons = document.getElementsByClassName("carousal-icon-card");
  // const loader_sliders = document.getElementsByClassName("loader-slide");
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.backgroundColor = "rgb(24, 24, 28)";
  }
  const icon = document.getElementById(activeSlideId + "-icon");
  // const loader = icon.querySelector(".loader-slide");
  icon.style.backgroundColor = "#3b3b3b";
}

// Listen for the slideChange event to log the current slide ID
swiper.on("slideChange", logCurrentSlideId);

const populateSwiper = async () => {
  let carousalTempalate = `<img class="carousal-bg"
            src="../assets/discover-page/carousal-page-front-alanwake.jpg"
            alt=""
          />
          <div class="feature-games-carousal-text">
            <div class="feature-games-carousal-info">
              <div class="carousal-game-logo">
                <img
                  src="../assets/discover-page/carousal images/alanwake2-logo.webp"
                  alt=""
                />
              </div>
              <div class="carousal-game-text">
                <h4>SAVE DURING HOLIDAY SALE!</h4>
                <p>
                  Buy Alan Wake 2 and get Alan Wake Remastered, our gift to you.
                  Offer ends January 10, 2024, see page for details.
                </p>
              </div>
              <div class="carousal-price">
                <p>
                  Starting at <span class="carousal-old-price">₹1,029 </span>
                  <span class="carousal-new-price">₹1,429 </span>
                </p>
              </div>
              <div class="carousal-buttons">
                <a href="../pages/gameinfo.html">
                  <button class="carousal-button save-now-button">
                    SAVE NOW
                  </button>
                </a>
                <button
                  onclick="logAPidata()"
                  class="carousal-button"
                  id="add-to-wishlist"
                >
                  <i class="bi bi-plus-circle"></i> ADD TO WISHLIST
                </button>
              </div>
            </div>
          </div>`;

  const swiperContainer = document.querySelector(
    ".feature-games-carousal .swiper-wrapper"
  );
  const swipperArray = swiperContainer.getElementsByClassName("swiper-slide");
  const caraousalIconArray = document.querySelectorAll(".carousal-icon-card");
  try {
    const data = await fetchCarousalData();
    // console.log(data);
    for (let i = 0; i < 6; i++) {
      swipperArray[i].innerHTML = carousalTempalate;
      swipperArray[i].setAttribute("id", data[i].gameSlug);
      caraousalIconArray[i].setAttribute("id", data[i].gameSlug + "-icon");
      caraousalIconArray[i].querySelector(".carousal-icon-image img").src =
        data[i].image_url;
      caraousalIconArray[i].querySelector(".carousal-icon-text").textContent =
        data[i].gameName;
      caraousalIconArray[i]
        .querySelector(".loader-slide")
        .setAttribute("id", data[i].gameSlug);
      swipperArray[i].querySelector(".carousal-bg").src = data[i].image_url;
      swipperArray[i].querySelector(".carousal-game-logo img").src =
        data[i].logo_url;
      swipperArray[i].querySelector(".carousal-game-text p").textContent =
        data[i].description;
      swipperArray[i].querySelector(
        ".carousal-price p span.carousal-old-price"
      ).textContent = "₹" + data[i].retailPrice;

      swipperArray[i].querySelector(
        ".carousal-price p span.carousal-new-price"
      ).textContent = "₹" + data[i].salePrice;
      if (data[i].retailPrice == "0") {
        swipperArray[i].querySelector(".carousal-price p").textContent = "";
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

populateSwiper();

bestGamesOf2023();

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

populateTrippleList("Best Games 2022", "left-tripple-list", [
  ["platforms", "4"],
  ["ordering", "-metacritic"],
  ["dates", "2021-11-01,2022-12-30"],
]);

populateTrippleList("Best Action Games", "middle-tripple-list", [
  ["platforms", "4"],
  ["ordering", "-metacritic"],
  ["genres", "action"],
]);
populateTrippleList("Best Platformers", "right-tripple-list", [
  ["platforms", "4"],
  ["ordering", "-metacritic"],
  ["genres", "platformer"],
]);

// Define the click event listener function
