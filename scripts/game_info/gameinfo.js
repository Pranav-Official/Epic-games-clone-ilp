import {
  fetchGameScreenShots,
  fetchGameThumbImage,
  fetchSingleGameData,
  fetchGameAchievements,
} from "../game_info/gameinfo_fetch.js";
import getPrice from "../_functions/getprice.js";
let gameSlug = "forza-horizon";

// Set a timeout to show the body after 3 seconds
setTimeout(function () {
  document.body.style.visibility = "visible";
}, 2100);

//function to dynamically load page details
export const displayPage = async () => {

  try {
    const gameData = await fetchSingleGameData(gameSlug);
    const screenshots = await fetchGameScreenShots(gameSlug);
    // const cheapSharkThumb = await fetchGameThumbImage(gameSlug);
    const achievementsOverview = await fetchGameAchievements(gameSlug, 1);
    const gamePriceData = null;
    //  await getPrice(gameSlug);
    console.log(gamePriceData);
    const truncatedDescription = limitWords(gameData.description, 150);
    const shortDescription = limitWords(gameData.description, 25);

    let screenshothtml = ``;
    updateStarRating(gameData.rating);
    screenshothtml = ` <div class="swiper-slide">
                  <img
                    height="330"
                    width="650"
                    src="${gameData.background_image}"
                    alt=""
                  />
                </div>`;
    swiper.appendSlide(screenshothtml);
    console.log(screenshothtml);
    document.querySelector("#game-main-title").innerHTML = gameData.name;
    document.querySelector(".gametext").innerHTML = shortDescription;
    document.querySelector(".game-big-description").innerHTML =
      truncatedDescription;
    //screenshots
    for (let i = 0; i < screenshots.count; i++) {
      screenshothtml = `<div class="swiper-slide"><img
                    height="330"
                    width="650"
                    src="${screenshots.results[i].image}"
                    alt=""
                  /></div>`;

      swiper.appendSlide(screenshothtml);
    }

    //genres
    const genres = gameData.genres;
    let genrehtml = ``;
    for (let genre of genres) {
      genrehtml += ` <li class="gnlitem">
         <a class="genlink">
          ${genre.name},
         </a>
       </li>`;
    }
    document.querySelector("#genre").innerHTML = genrehtml;
    //features
    const features = gameData.tags;
    let featureshtml = ``;
    let i = 2;
    for (let tag of features) {
      if (!tag.name.includes("Steam")) {
        featureshtml += ` <li class="gnlitem">
                        <a class="genlink" >${tag.name},</a>
                      </li>`;
        i--;
      }

      if (i == 0) {
        break;
      }
    }
    document.querySelector("#features").innerHTML = featureshtml;

    //faq div
    document.querySelector(
      ".offer-faq-text"
    ).innerHTML = `Buy ${gameData.name} from our Store and we’ll email a digital voucher
                code for discount on new purchases.`;

    //thumb image
    // document.querySelector("#game-thumb-image").src = cheapSharkThumb[0].thumb;

    //game price and discount
    if (gamePriceData != null) {
      let discountRounded = parseInt(gamePriceData.calculatedDiscount);
      document.querySelector(
        ".discount-percent"
      ).innerHTML = `${discountRounded}%`;
      document.querySelector(
        ".slashed-price"
      ).innerHTML = `<s>₹${gamePriceData.salePrice}</s>`;
      document.querySelector(
        ".price-now"
      ).innerHTML = `₹${gamePriceData.retailPrice}`;
      if (discountRounded != 0) {
        document.querySelector(".sale-end-info").innerHTML = `On Sale now`;
      } else {
        document.querySelector(
          ".sale-end-info"
        ).innerHTML = `No Discount Available`;
      }
    }

    //developer and publisher
    document.querySelector(".dev-who").innerHTML = gameData.developers[0].name;
    document.querySelector(".pub-who").innerHTML = gameData.publishers[0].name;
    //release date
    document.querySelector(".rel-who").innerHTML = gameData.released;

    //Achievements
    let achievementPage = achievementsOverview.results;
    let limitNumber = 5;
    let achievementInnerHtml = ``;
    for (let achievement of achievementPage) {
      limitNumber--;
      achievementInnerHtml += `<div class="achievement-grid-item">
      <div class="achievement-grid-item-image">
                <img
                  width="100"
                  height="100"
                  src="${achievement.image}"
                  alt=""
                />
              </div>
              <div class="achievement-grid-item-name">${achievement.name}</div>
              <div class="achievement-grid-item-tropiepart">
                <div class="trophie">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    style="color: rgb(202, 81, 43)"
                    fill="currentColor"
                    class="bi bi-trophy-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"
                    />
                  </svg>
                </div>
                <div class="exppart">10XP</div>
              </div>
            </div>`;
      if (limitNumber == 0) {
        break;
      }
    }
    document.querySelector(".achievements-grid-panel").innerHTML =
      achievementInnerHtml;
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
};

// swiper for game screen shot carousal
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1, // Number of slides per view
  spaceBetween: 15, // Space between slides
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

//function to expand the text div on click
function expandDiv() {
  const expandableDiv = document.getElementById("big-game-description");
  if (expandableDiv.clientHeight === expandableDiv.scrollHeight) {
    expandableDiv.style.height = `${expandableDiv.scrollHeight / 2}px`; // Set half height
  } else {
    expandableDiv.style.height = `${expandableDiv.scrollHeight}px`; // Set full height
  }
}

//star rating
function updateStarRating(rating) {
  // Calculate the number of filled stars (assuming a 5-star system)
  const numStarsFilled = Math.round((rating / 5) * 5);
  const starRatingElement = document.getElementById("starRating");
  starRatingElement.innerHTML =
    "★".repeat(numStarsFilled) + "☆".repeat(5 - numStarsFilled);
  document.querySelector(".rating").innerHTML = `${numStarsFilled}.0`;
}

function limitWords(text, n) {
  // Split the text into an array of words
  const words = text.split(" ");

  // Take the first n words
  const limitedWords = words.slice(0, n);

  // Join the limited words into a string
  let limitedText = limitedWords.join(" ");

  // Ensure the result ends with a period
  if (!limitedText.endsWith(".")) {
    limitedText += "....";
  }

  return limitedText;
}

document.getElementById("show-more-link").addEventListener("click", expandDiv);

window.onload = displayPage;
