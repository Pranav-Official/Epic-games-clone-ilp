const gamesArray = [
  {
    id: "0",
    title: "Ghostrunner 2",
    releaseDate: "2024-01-01",
    actualPrice: 2599,
    offerPrice: 2209.15,
    offerPercentage: "-15%",
    image: "../assets/wishlist_images/wishlist1.PNG",
    salesEndDate: "01/10/24",
    salesEndTime: "9:30 PM",
  },
  {
    id: "1",
    title: "Ghostrunner 2",
    releaseDate: "2024-01-01",
    actualPrice: 2599,
    offerPrice: 2209.15,
    offerPercentage: "-15%",
    image: "../assets/wishlist_images/wishlist1.PNG",
    salesEndDate: "01/10/24",
    salesEndTime: "9:30 PM",
  },
  {
    id: "2",
    title: "Ghostrunner 2",
    releaseDate: "2024-01-01",
    actualPrice: 2599,
    offerPrice: 2209.15,
    offerPercentage: "-15%",
    image: "../assets/wishlist_images/wishlist1.PNG",
    salesEndDate: "01/10/24",
    salesEndTime: "9:30 PM",
  },
];

const wishListTemplate = (wishlistItem) => {
  return `
    <div class="wishlist">
      <div class="wishimg">
        <img src="${wishlistItem.image}" alt="wishlist1" />
        <div>
          <img
            id="windows-icon"
            src="../assets/wishlist_images/windows-icon.svg"
            alt="windows-icon"
          />
        </div>
      </div>
      <div class="wishdetails">
        <div class="wishdetails-row1">
          <div class="wishdetails-row1-flex1">
            <p><button id="basegm">BASE GAME</button></p>
            <div><h5>${wishlistItem.title}</h5></div>
          </div>
          <div class="wishdetails-row1-flex2">
            <button id="percentbtn">${wishlistItem.offerPercentage}</button>
            <p id="actualprice">₹${wishlistItem.actualPrice}</p>
            <p id="price">₹${wishlistItem.offerPrice}</p>
            <div><p id="sales">Sale ends ${wishlistItem.salesEndDate} at ${
    wishlistItem.salesEndTime
  }</p></div>
          </div>
        </div>
        <div>
          <img
            id="earn-icon"
            src="../assets/wishlist_images/earn-icon.svg"
            alt="earn icon"
          />
           <p id="des">
              Earn a boosted 10% back in Epic Rewards,offer ends in ${convertDate(
                wishlistItem.salesEndDate
              )}.
            </p>
        </div>
        <div class="button-row">
           <div class="remove-button"><button class="remove" data-index="${
             wishlistItem.id
           }">Remove</button></div>
          <div class="addtocart-button">
            <button id="add2cart">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  <br>
  `;
};
//<div class="remove-button"><a id="remove" href="#">Remove</a></div>
const displayWishlist = (games) => {
  const wishlistContainer = document.querySelector(".wishlist-container");

  games.forEach((game, index) => {
    const wishlistDiv = document.createElement("div");
    wishlistDiv.className = "wishlist";
    wishlistDiv.innerHTML = wishListTemplate(game);

    wishlistContainer.appendChild(wishlistDiv);

    // Add event listener to the "Remove" button
    const removeButton = wishlistDiv.querySelector(".remove");
    removeButton.addEventListener("click", () => removeWishlistItem(index));
  });
};

document.addEventListener("DOMContentLoaded", function () {
  // Call the function with the array of games
  displayWishlist(gamesArray);
});
// Function to convert date format
const convertDate = (originalDate) => {
  const [month, day, year] = originalDate.split("/");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${day}`;
};
//remove each wishlist
const removeWishlistItem = (index) => {
  const wishlistContainer = document.querySelector(".wishlist-container");
  const wishlistItems = wishlistContainer.querySelectorAll(".wishlist");

  // Check if the index is valid
  if (index >= 0 && index < wishlistItems.length) {
    // Remove the wishlist item
    wishlistItems[index].remove();
  }
};
