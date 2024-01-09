import { firebaseConfig } from "../../environment.js";
import { addToCart } from "../_functions/cartfunctions.js";
import {
  addToWishlist,
  removeWishlistInFirebase,
} from "../_functions/wishlist_functions.js";
import { displayWishlistSlugs } from "../_functions/wishlist_functions.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const dbref = doc(database, "UsersData", "anlysolly@gmail.com");
let tempWishlistArray = [];

//function for loading wishlist items from firebase
const wishlistPage = async () => {
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempWishlistArray = userData.Wishlist;
    }
    console.log(tempWishlistArray);
    sortWishlistPageByRecentlyAdded();
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
};

//updating wishlist items in firebase
const updateWishlistInFirebase = async (game) => {
  const gameSlug = game.slug;
  const isGamePresent = tempWishlistArray.some(
    (item) => item.slug === gameSlug
  );

  if (!isGamePresent) {
    tempWishlistArray.push(game);
    await updateDoc(dbref, { Wishlist: tempWishlistArray });
  }
};

//creating template for wishlist
const wishListTemplate = (wishlistItem) => {
  return `
    <div class="wishlist-box" dataSlug=${wishlistItem.slug}>
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
            <div><p id="sales">Game updated on ${formatDate(
              wishlistItem.salesEndDate
            )} at ${formatTime(wishlistItem.salesEndTime)} PM</p></div>
          </div>
        </div>
        <div>
          <img
            id="earn-icon"
            src="../assets/wishlist_images/earn-icon.svg"
            alt="earn icon"
          />
           <p id="des">
              Earn a boosted 10% back in Epic Rewards. 
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

//function to display wishlist
const displayWishlist = (games) => {
  const wishlistContainer = document.querySelector(".wishlist-container");
  wishlistContainer.innerHTML = "";
  games.forEach((game) => {
    const wishlistDiv = document.createElement("div");
    wishlistDiv.className = "wishlist";
    wishlistDiv.innerHTML = wishListTemplate(game);
    wishlistContainer.appendChild(wishlistDiv);

    // Add event listener to the "Remove" button
    const removeButton = wishlistDiv.querySelector(".remove");
    removeButton.addEventListener("click", async (event) => {
      const wishlist_box = event.target.closest(".wishlist-box");
      const dataSlug = wishlist_box.getAttribute("dataSlug");
      console.log(dataSlug);
      await removeWishlistInFirebase(dataSlug);
      window.location.reload();
    });

    const addToCartButton = wishlistDiv.querySelector("#add2cart");
    addToCartButton.addEventListener("click", async (event) => {
      const wishlist_box = event.target.closest(".wishlist-box");
      const dataSlug = wishlist_box.getAttribute("dataSlug");
      console.log(dataSlug);
      addToCart(dataSlug);
      addToCartButton.textContent = "ADDED TO CART";
    });
  });
};

//callimg page load
document.addEventListener("DOMContentLoaded", function () {
  // Call the function with the array of games
  setTimeout(() => wishlistPage(), 10);
});

//sorting the wishlist-Alphabetically:A-Z
const sortWishlistPageByAlphabetAsc = () => {
  tempWishlistArray.sort((a, b) => b.title.localeCompare(a.title));
  displayWishlist(tempWishlistArray);
};
//sorting the wishlist-Alphabetically:Z-A
const sortWishlistPageByAlphabetDesc = () => {
  tempWishlistArray.sort((a, b) => a.title.localeCompare(b.title));
  displayWishlist(tempWishlistArray);
};
//sorting the wishlist by Price:Low to High
const sortWishlistPageByPriceLowtoHigh = () => {
  tempWishlistArray.sort((a, b) => a.offerPrice - b.offerPrice);
  displayWishlist(tempWishlistArray);
};
//sorting the wishlist by Price:High to Low
const sortWishlistPageByPriceHightoLow = () => {
  tempWishlistArray.sort((a, b) => b.offerPrice - a.offerPrice);
  displayWishlist(tempWishlistArray);
};
//Sort:Recently added wishlist
const sortWishlistPageByRecentlyAdded = () => {
  console.log("sorting by asc");
  tempWishlistArray.reverse();
  displayWishlist(tempWishlistArray);
};

//calling wishlist sorting

document.querySelector("#sortingtype").addEventListener("change", (event) => {
  // console.log(event.target.value);
  let sortType = parseInt(event.target.value);
  switch (sortType) {
    case 1:
      sortWishlistPageByRecentlyAdded();
      break;
    case 2:
      sortWishlistPageByAlphabetAsc();
      break;
    case 3:
      sortWishlistPageByAlphabetDesc();
      break;
    case 4:
      sortWishlistPageByPriceLowtoHigh();
      break;
    case 5:
      sortWishlistPageByPriceHightoLow();
      break;
  }
});

// Function to format date as dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const year = date.getFullYear();
  return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};

// Function to format time as HH:MM
const formatTime = (timeString) => {
  const time = new Date(timeString);
  const hours = time.getHours() + 5;
  const minutes = time.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

//reset filter
const filterReset = () => {
  displayWishlist(tempWishlistArray);
};
document.getElementById("filter-reset-button").addEventListener("click", () => {
  filterReset();
});

//filter wishlist by genre
const filterWishlistPageByGenre = async (genre) => {
  let filteredItems = [];
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const tempWishlistArray = userData.Wishlist;
      tempWishlistArray.forEach((item) => {
        let genres = item.genres;
        for (let i = 0; i < genres.length; i++)
          if (genres[i] === genre) {
            filteredItems.push(item);
            break;
          }
      });
    }
    console.log(filteredItems);
    displayWishlist(filteredItems);
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
};

document.getElementById("filter_by_action").addEventListener("click", () => {
  filterWishlistPageByGenre("action");
});
document.getElementById("filter_by_indie").addEventListener("click", () => {
  filterWishlistPageByGenre("indie");
});

document.getElementById("filter_by_adventure").addEventListener("click", () => {
  filterWishlistPageByGenre("adventure");
});

document.getElementById("filter_by_rpg").addEventListener("click", () => {
  filterWishlistPageByGenre("rpg");
});

document.getElementById("filter_by_strategy").addEventListener("click", () => {
  filterWishlistPageByGenre("strategy");
});

document.getElementById("filter_by_shooter").addEventListener("click", () => {
  filterWishlistPageByGenre("shooter");
});

document.getElementById("filter_by_casual").addEventListener("click", () => {
  filterWishlistPageByGenre("casual");
});

document.getElementById("filter_by_puzzle").addEventListener("click", () => {
  filterWishlistPageByGenre("puzzle");
});

document.getElementById("filter_by_arcade").addEventListener("click", () => {
  filterWishlistPageByGenre("arcade");
});

document
  .getElementById("filter_by_platformer")
  .addEventListener("click", () => {
    filterWishlistPageByGenre("platformer");
  });

document
  .getElementById("filter_by_massive-multiplayer")
  .addEventListener("click", () => {
    filterWishlistPageByGenre("massive-multiplayer");
  });

document.getElementById("filter_by_racing").addEventListener("click", () => {
  filterWishlistPageByGenre("racing");
});

document.getElementById("filter_by_sports").addEventListener("click", () => {
  filterWishlistPageByGenre("sports");
});

document.getElementById("filter_by_fighting").addEventListener("click", () => {
  filterWishlistPageByGenre("fighting");
});

document.getElementById("filter_by_family").addEventListener("click", () => {
  filterWishlistPageByGenre("family");
});

document
  .getElementById("filter_by_board-games")
  .addEventListener("click", () => {
    filterWishlistPageByGenre("board-games");
  });

document
  .getElementById("filter_by_educational")
  .addEventListener("click", () => {
    filterWishlistPageByGenre("educational");
  });

document.getElementById("filter_by_card").addEventListener("click", () => {
  filterWishlistPageByGenre("card");
});

//filter wishlist by features
const filterWishlistPageByFeatures = async (feature) => {
  let filteredItems = [];
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const tempWishlistArray = userData.Wishlist;
      tempWishlistArray.forEach((item) => {
        let tags = item.tags;
        for (let i = 0; i < tags.length; i++)
          if (tags[i] === feature) {
            filteredItems.push(item);
            break;
          }
      });
    }
    console.log(filteredItems);
    displayWishlist(filteredItems);
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
};

document.getElementById("filter_by_sp").addEventListener("click", () => {
  console.log("working");
  filterWishlistPageByFeatures("singleplayer");
});

document.getElementById("filter_by_sa").addEventListener("click", () => {
  filterWishlistPageByFeatures("steam-achievements");
});

document.getElementById("filter_by_mp").addEventListener("click", () => {
  filterWishlistPageByFeatures("multiplayer");
});

document.getElementById("filter_by_fcsupport").addEventListener("click", () => {
  filterWishlistPageByFeatures("full-controller-support");
});

document
  .getElementById("filter_by_steamcloud")
  .addEventListener("click", () => {
    filterWishlistPageByFeatures("steam-cloud");
  });

document
  .getElementById("filter_by_atmospheric")
  .addEventListener("click", () => {
    filterWishlistPageByFeatures("atmospheric");
  });

document
  .getElementById("filter_by_stradingcards")
  .addEventListener("click", () => {
    filterWishlistPageByFeatures("steam-trading-cards");
  });

document
  .getElementById("filter_by_greatsoundtrack")
  .addEventListener("click", () => {
    filterWishlistPageByFeatures("great-soundtrack");
  });

document.getElementById("filter_by_coop").addEventListener("click", () => {
  filterWishlistPageByFeatures("co-op");
});

//filter wishlist by price
const filterWishlistPageByPrice = async (price) => {
  let filteredItems = [];
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const tempWishlistArray = userData.Wishlist;
      tempWishlistArray.forEach((item) => {
        let itemPrice = item.offerPrice;
        if (price == 1099) {
          if (itemPrice > price) {
            filteredItems.push(item);
          }
        } else if (price == -1) {
          if (item.offerPrice != item.actualPrice) {
            filteredItems.push(item);
          }
        } else if (itemPrice < price) {
          filteredItems.push(item);
        }
      });
    }
    displayWishlist(filteredItems);
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
};

document.querySelectorAll(".price-buttons").forEach((button) => {
  button.addEventListener("click", () => {
    let priceOnButton = button.value;
    filterWishlistPageByPrice(priceOnButton);
  });
});

// await addToWishlist("grand-theft-auto-vice-city");
// await displayWishlistSlugs();
