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

const appedSalesHighlights = async (id) => {
  const node = document.getElementsByClassName("sale-highlights")[0];
  const sales_highlights_copy = node.cloneNode(true);
  sales_highlights_copy.setAttribute("id", id);
  sales_highlights_copy
    .querySelector(".game-cards-container")
    .setAttribute("id", id + "-game-cards");
  node.parentNode.appendChild(sales_highlights_copy);
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

        // Update game card content with fetched data
        gameCard.querySelector(".game-card-image img").src =
          data["results"][i].background_image;
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

const swiper = new Swiper(".swiper", {
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
  console.log("Current Active Slide ID:", activeSlideId);
  const icons = document.getElementsByClassName("carousal-icon-card");
  // const loader_sliders = document.getElementsByClassName("loader-slide");
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.backgroundColor = "rgb(24, 24, 28)";
    // const loader =
    //   icons[i].querySelector(".loader-slide") ||
    //   icons[i].querySelector(".loader-slide-active");
    // loader.setAttribute("class", "loader-slide");
  }
  const icon = document.getElementById(activeSlideId + "-icon");
  // const loader = icon.querySelector(".loader-slide");
  icon.style.backgroundColor = "#3b3b3b";
  // loader.setAttribute("class", "loader-slide-active");
  // const loaderSlides = document.querySelectorAll(".loader-slide");

  // // Iterate through loader slides
  // loaderSlides.forEach((loaderSlide) => {
  //   // Check if the loader slide has the same ID as the active slide
  //   if (loaderSlide.id === activeSlideId) {
  //     // Move the loader slide in the x direction by 12rem
  //     loaderSlide.classList.add("loader-slide-active");
  //   } else {
  //     // Reset the position for other loader slides
  //     loaderSlide.classList.remove("loader-slide-active");
  //   }
  // });
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

  const swiperContainer = document.querySelector(".swiper-wrapper");
  const swipperArray = swiperContainer.getElementsByClassName("swiper-slide");
  const caraousalIconArray = document.querySelectorAll(".carousal-icon-card");
  try {
    const data = await fetchCarousalData();
    console.log(data);
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
