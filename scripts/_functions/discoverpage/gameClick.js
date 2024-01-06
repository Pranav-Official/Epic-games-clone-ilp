const handleGameCardClick = (event) => {
  // Get the value of the "data-slug" attribute
  const dataSlug = event.currentTarget.getAttribute("data-slug");

  // Log the value
  console.log("Clicked game card with data-slug:", dataSlug);

  // Add additional logic as needed
};

// Add the click event listener to each game card
document.querySelectorAll(".game-card").forEach((gameCard) => {
  gameCard.addEventListener("click", handleGameCardClick);
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