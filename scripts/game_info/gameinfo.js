import { getTransactionList } from "../_functions/transaction_function.js";
import {
  displayWishlistSlugs,
  addToWishlist,
} from "../_functions/wishlist_functions.js";
import { getGameSlugFromCart } from "../_functions/cartfunctions.js";
import { addToCart } from "../_functions/cartfunctions.js";
import {
  fetchGameScreenShots,
  fetchGameThumbImage,
  fetchSingleGameData,
  fetchGameAchievements,
} from "../game_info/gameinfo_fetch.js";
import getPrice from "../_functions/getprice.js";

//function to dynamically load page details
export const displayPage = async () => {
  try {
    const gameSlug = localStorage.getItem("gameSlug-info");
    const gameData = await fetchSingleGameData(gameSlug);
    const screenshots = await fetchGameScreenShots(gameSlug);
    const cheapSharkThumb = await fetchGameThumbImage(gameSlug);
    console.log(cheapSharkThumb);
    const achievementsOverview = await fetchGameAchievements(gameSlug, 1);
    const gamePriceData = await getPrice(gameSlug);
    console.log(gamePriceData);
    const truncatedDescription = limitWords(gameData.description, 200);
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

    // thumb image
    try {
      document.querySelector("#game-thumb-image").src =
        cheapSharkThumb[0].thumb;
    } catch (error) {
      console.log("error fetching");
    }
    //game price and discount
    if (gamePriceData != null && gamePriceData.retailPrice != 0) {
      let discountRounded = parseInt(gamePriceData.calculatedDiscount);
      document.querySelector(
        ".discount-percent"
      ).innerHTML = `${discountRounded}%`;
      document.querySelector(
        ".slashed-price"
      ).innerHTML = `<s>₹${gamePriceData.retailPrice}</s>`;
      document.querySelector(
        ".price-now"
      ).innerHTML = `₹${gamePriceData.salePrice}`;
      if (discountRounded != 0) {
        document.querySelector(".sale-end-info").innerHTML = `On Sale now`;
      } else {
        document.querySelector(
          ".sale-end-info"
        ).innerHTML = `No Discount Available`;
      }
    } else {
      console.log("jddj");

      document.querySelector(".sale-end-info").remove();
      document.querySelector(".price-and-discount").remove();
    }

    //developer and publisher
    try {
      document.querySelector(".dev-who").innerHTML =
        gameData.developers[0].name;
      document.querySelector(".pub-who").innerHTML =
        gameData.publishers[0].name;
    } catch (error) {
      console.log("fetch error");
    }
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

    //editions for games
    let gameEditionsHtml = ``;
    let discountRounded = parseInt(gamePriceData.calculatedDiscount);
    gameEditionsHtml += ` <div class="editions-heading">${gameData.name} Editions</div>
        <div class="edition-card">
            <div class="card-toppart">
              <div class="cardimg">
                <img
                  width="360"
                  height="200"
                  src="${gameData.background_image}"
                  alt=""
                />
              </div>
              <div class="card-content">
                <div class="tag-and-title">
                  <div class="tag">BASE GAME</div>
                  <div class="card-title">${gameData.name}</div>
                </div>
                <div class="card-text-part">
                  ${shortDescription}
                </div>
              </div>
            </div>
            <div class="line-separator"></div>
            <div class="game-editions-card-price">
              <div class="price-and-discount-editions">
                <div class="discount-editions">
                  <div class="discount-percent-editions">${discountRounded}%</div>
                </div>
                <div class="slashed-price-edtions"><s>₹${gamePriceData.retailPrice}</s></div>
                <div class="price-now-editions">₹${gamePriceData.salePrice}</div>
              </div>
              <div class="cart-and-wishlist-buttons">
                <div class="add-to-cartbutton-editions">
                  <a class="add-to-cartbutton-link-editions">ADD TO CART</a>
                </div>
                <div class="add-to-wishbutton-editions">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="23"
                    fill="currentColor"
                    id="plusbtn"
                    class="bi bi-plus-circle"
                    viewBox="0 0 18 21"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                  </svg>

                  <a class="add-to-wishbutton-link-editions">
                    ADD TO WISHLIST</a
                  >
                </div>
              </div>
            </div>
          </div>`;
    let highestEdition = 0;
    let editionLimit = 5;
    for (let edition of cheapSharkThumb) {
      if (parseInt(edition.cheapest) > highestEdition) {
        highestEdition = parseInt(edition.cheapest);
      }
    }
    console.log(highestEdition);
    for (let edition of cheapSharkThumb) {
      let editionType;
      let editionDiscountPercent =
        100 -
        Math.floor(((edition.cheapest * 83) / (highestEdition * 83)) * 100);
      let differentEditions = [
        "STANDARD",
        "COLLECTORS",
        "DELUXE",
        "ULTIMATE",
        "DEFINITIVE",
        "GOLD",
        "PREMIUM",
      ];
      console.log(editionLimit);
      if (editionLimit == 0) {
        break;
      }
      for (editionType of differentEditions) {
        if (edition.internalName.includes(editionType)) {
          gameEditionsHtml += `    <div class="edition-card">
            <div class="card-toppart">
              <div class="cardimg">
                <img
                  width="360"
                  height="200"
                  src="${gameData.background_image}"
                  alt=""
                />
              </div>
              <div class="card-content">
                <div class="tag-and-title">
                  <div class="tag">BASE GAME</div>
                  <div class="card-title">${edition.external}</div>
                </div>
                <div class="card-text-part">
                   ${shortDescription}
                </div>
              </div>
            </div>
            <div class="line-separator"></div>
            <div class="game-editions-card-price">
              <div class="price-and-discount-editions">
                <div class="discount-editions">
                  <div class="discount-percent-editions">${editionDiscountPercent}%</div>
                </div>
                <div class="slashed-price-edtions"><s>₹${Math.floor(
                  highestEdition * 83
                )}</s></div>
                <div class="price-now-editions"> ₹${Math.floor(
                  edition.cheapest * 83
                )}</div>
              </div>
              <div class="cart-and-wishlist-buttons">
                <div class="add-to-cartbutton-editions">
                  <a class="add-to-cartbutton-link-editions">ADD TO CART</a>
                </div>
                <div class="add-to-wishbutton-editions">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="23"
                    fill="currentColor"
                    id="plusbtn"
                    class="bi bi-plus-circle"
                    viewBox="0 0 18 21"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                  </svg>

                  <a class="add-to-wishbutton-link-editions">
                    ADD TO WISHLIST</a
                  >
                </div>
              </div>
            </div>
          </div>`;
        }
      }
      editionLimit--;
    }
    let wholeDiv = document.querySelector(".wholepage");
    document.querySelector(".game-editions").innerHTML = gameEditionsHtml;
    let wholeDivHeight = document.querySelector(".game-editions").offsetHeight;
    console.log(wholeDivHeight);
    wholeDiv.style.height = `${wholeDivHeight + 2000}px`;

    //checking game is in cart , whishlist ,or bought
    if ((await checkIfBought()) == true) {
      document.querySelector(".buy-button-link").innerHTML = "In Library";
    } else if ((await checkIfInCart()) == true) {
      document.querySelector(".add-to-cartbutton-link").innerHTML = "IN CART";
    } else if ((await checkIfInWishList()) == true) {
      document.querySelector(".add-to-wishbutton-link").innerHTML =
        "IN WISHLIST";
    }

    document.querySelector(".footer-main-container").style.display = "block";
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
};

// Set a timeout to show the body after 3 seconds
setTimeout(function () {
  document.body.style.visibility = "visible";
}, 2500);

// swiper for game screen shot carousal
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
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

//function to limit words
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

//check if game is  bought
const checkIfBought = async () => {
  const gameSlug = localStorage.getItem("gameSlug-info");
  let transactionList = await getTransactionList();
  console.log(transactionList);
  if (transactionList != null) {
    for (let transaction of transactionList) {
      if (transaction.slug == gameSlug) {
        return true;
      }
    }
  }
  return false;
};

//check if game is in cart
const checkIfInCart = async () => {
  console.log("Enter");
  const gameSlug = localStorage.getItem("gameSlug-info");
  let cartSlugList = await getGameSlugFromCart();
  console.log(cartSlugList);
  if (cartSlugList != null) {
    for (let slug of cartSlugList) {
      if (slug == gameSlug) {
        return true;
      }
    }
  }
  return false;
};

//check if game is in  wishlist
const checkIfInWishList = async () => {
  const gameSlug = localStorage.getItem("gameSlug-info");
  let wishlistArray = await displayWishlistSlugs();
  console.log(wishlistArray);
  if (wishlistArray != null) {
    for (let wishitem of wishlistArray) {
      if (wishitem == gameSlug) {
        return true;
      }
    }
  }
  return false;
};

document
  .querySelector(".add-to-cartbutton-link")
  .addEventListener("click", async () => {
    const gameSlug = localStorage.getItem("gameSlug-info");
    if (localStorage.getItem("userId") == null) {
      window.location.href = "../../pages/login_page/login.html";
    } else {
      console.log("heheh");
      if (
        (await checkIfBought()) == false &&
        (await checkIfInCart()) == false
      ) {
        addToCart(gameSlug);
        document.querySelector(".add-to-cartbutton-link").innerHTML = "IN CART";
      }
    }
  });

document
  .querySelector(".add-to-wishbutton-link")
  .addEventListener("click", async () => {
    console.log("click");
    const gameSlug = localStorage.getItem("gameSlug-info");
    if (localStorage.getItem("userId") == null) {
      window.location.href = "../../pages/login_page/login.html";
    } else {
      if (
        (await checkIfBought()) == false &&
        (await checkIfInWishList()) == false
      ) {
        addToWishlist(gameSlug);
        document.querySelector(".add-to-wishbutton-link").innerHTML =
          "IN WISHLIST";
      }
    }
  });

window.onload = displayPage;
