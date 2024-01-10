import { addToWishlist, wishlistItemCount } from "./wishlist_functions.js";
import { checkIfBought } from "./transaction_function.js";

//fuction to handle click to game info
const handleGameCardClick = (event) => {
  // Get the value of the "data-slug" attribute
  const dataSlug = event.currentTarget.getAttribute("data-slug");

  // Log the value
  // console.log("click to game info", event.currentTarget);
  localStorage.setItem("gameSlug-info", dataSlug);
  window.location.href = "../../pages/gameinfo.html";

  // Add additional logic as needed
};

//fuction to handle click to add to wishlist
const handleAddToWishListClick = async (event) => {
  // Log the value
  event.stopPropagation();
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "../../pages/login_page/login.html";
  }
  console.log("Click to add to wishlist");
  const nearestGameCard = event.target.closest(".game-card");
  const gameSlug = nearestGameCard.getAttribute("data-slug");
  const isBought = await checkIfBought(gameSlug);
  if (isBought == true) {
    document.querySelector(".wishlist-message h3").innerHTML =
      "You have already bought this game";
    document.querySelector(".wishlist-message").classList.add("active");
    setTimeout(() => {
      document.querySelector(".wishlist-message").classList.remove("active");
    }, 2500);
    return;
  }
  const result = await addToWishlist(gameSlug);
  // console.log(result);
  if (result == false) {
    document.querySelector(".wishlist-message h3").innerHTML =
      "This game has been added in your wishlist";
    document.querySelector(".wishlist-message").classList.add("active");
    setTimeout(() => {
      document.querySelector(".wishlist-message").classList.remove("active");
    }, 2500);
  } else if (result == true) {
    document.querySelector(".wishlist-message h3").innerHTML =
      "This game has been added in your wishlist";
    document.querySelector(".wishlist-message").classList.add("active");
    setTimeout(() => {
      document.querySelector(".wishlist-message").classList.remove("active");
    }, 2500);
  }

  // Add additional logic as needed
};

// Add the click event listener to each game card
document.querySelectorAll(".game-card").forEach((gameCard) => {
  gameCard.addEventListener("click", handleGameCardClick);
});
// Add the click event listener to each game card
document.querySelectorAll(".add-to-wish-list-button").forEach((gameCard) => {
  gameCard.addEventListener("click", handleAddToWishListClick);
});

// Add the click event listener to each search suggestion
document.querySelectorAll(".search-suggestion-item").forEach((gameCard) => {
  gameCard.addEventListener("click", (event) => {
    console.log("Clicked search suggestion item");
    handleGameCardClick(event);
  });
});

const checkAndAddTrippleItemListener = () => {
  const trippleItems = document.querySelectorAll(".tripple-item");

  if (trippleItems.length === 15) {
    trippleItems.forEach((trippleItem) => {
      trippleItem.addEventListener("click", handleGameCardClick);
    });
  }
};

// Check and add event listener initially
checkAndAddTrippleItemListener();

// Add mutation observer
const observer = new MutationObserver(() => {
  checkAndAddTrippleItemListener();
});

observer.observe(document.body, { childList: true, subtree: true });
