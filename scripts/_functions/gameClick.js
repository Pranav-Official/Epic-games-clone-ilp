import { addToWishlist, wishlistItemCount } from "./wishlist_functions.js";

const handleGameCardClick = (event) => {
  // Get the value of the "data-slug" attribute
  const dataSlug = event.currentTarget.getAttribute("data-slug");

  // Log the value
  // console.log("click to game info", event.currentTarget);
  localStorage.setItem("gameSlug-info", dataSlug);
  window.location.href = "../../pages/gameinfo.html";

  // Add additional logic as needed
};

const handleAddToWishListClick = async (event) => {
  // Log the value
  event.stopPropagation();
  console.log("Click to add to wishlist");
  const nearestGameCard = event.target.closest(".game-card");
  const gameSlug = nearestGameCard.getAttribute("data-slug");
  const result = await addToWishlist(gameSlug);
  // console.log(result);
  if (result == false) {
    document.querySelector(".wishlist-message h3").innerHTML =
      "This game has been added in your wishlist";
    document.querySelector(".wishlist-message").classList.add("active");
    setTimeout(() => {
      document.querySelector(".wishlist-message").classList.remove("active");
    }, 3000);
  } else if (result == true) {
    document.querySelector(".wishlist-message h3").innerHTML =
      "This game has been added in your wishlist";
    document.querySelector(".wishlist-message").classList.add("active");
    setTimeout(() => {
      document.querySelector(".wishlist-message").classList.remove("active");
    }, 3000);
  }

  // Add additional logic as needed
};

// Add the click event listener to each game card
document.querySelectorAll(".game-card").forEach((gameCard) => {
  gameCard.addEventListener("click", handleGameCardClick);
});

document.querySelectorAll(".add-to-wish-list-button").forEach((gameCard) => {
  gameCard.addEventListener("click", handleAddToWishListClick);
});

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

// You can also use mutation observer to watch for changes in the DOM and add the listener dynamically.
const observer = new MutationObserver(() => {
  checkAndAddTrippleItemListener();
});

observer.observe(document.body, { childList: true, subtree: true });
