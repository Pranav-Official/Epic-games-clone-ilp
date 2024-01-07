import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuDu8PAD0vryP84FEzO-_a-2Tx6_FJRCg",
  authDomain: "epic-games-clone-c0009.firebaseapp.com",
  projectId: "epic-games-clone-c0009",
  storageBucket: "epic-games-clone-c0009.appspot.com",
  messagingSenderId: "96371749246",
  appId: "1:96371749246:web:8de6e1806dea62dab5c32f",
  measurementId: "G-L9RY8WEZQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const dbref = doc(database, "UsersData", "anlysolly@gmail.com");
let tempWishlistArray = [];

getDoc(dbref).then((docSnapshot) => {
  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();
    tempWishlistArray = userData.Wishlist;
    console.log(tempWishlistArray);
  }
});
const updateWishlistInFirebase = async (game) => {
  tempWishlistArray.push(game);
  await updateDoc(dbref, { Wishlist: tempWishlistArray });
};
const removeWishlistInFirebase = async (game) => {
  {
    let updatedWishlistArray = tempWishlistArray.filter(
      (singlegame) => singlegame != game
    );
    await updateDoc(dbref, { Wishlist: updatedWishlistArray });
    displayWishlist(updatedWishlistArray);
  }
};

let obj = {
  id: "3",
  title: "B Ghostrunner 2",
  slug: "ghostrunner-2",
  releaseDate: "2024-01-01",
  actualPrice: 2599,
  offerPrice: 709.15,
  offerPercentage: "-15%",
  image: "../assets/wishlist_images/wishlist1.PNG",
  salesEndDate: "01/10/24",
  salesEndTime: "9:30 PM",
};

// setTimeout(() => {
//   updateWishlistInFirebase(obj);
// }, 2000);
// const removeWishlistInFirebase = async (gameSlug) => {
//   console.log(tempWishlistArray);
//   let updatedWishlistArray = tempWishlistArray.filter(
//     (game) => game != gameSlug
//   );
//   await updateDoc(dbref, { Wishlist: updatedWishlistArray });
// };
//array model
// const gamesArray = [
//   {
//     id: "0",
//     title: "Ghostrunner 2",
//     slug: "ghostrunner-2",
//     releaseDate: "2024-01-01",
//     actualPrice: 2599,
//     offerPrice: 2209.15,
//     offerPercentage: "-15%",
//     image: "../assets/wishlist_images/wishlist1.PNG",
//     salesEndDate: "01/10/24",
//     salesEndTime: "9:30 PM",
//   },
//   {
//     id: "1",
//     title: "Ghostrunner 2",
//     slug: "ghostrunner-2",
//     releaseDate: "2024-01-01",
//     actualPrice: 2599,
//     offerPrice: 2209.15,
//     offerPercentage: "-15%",
//     image: "../assets/wishlist_images/wishlist1.PNG",
//     salesEndDate: "01/10/24",
//     salesEndTime: "9:30 PM",
//   },
//   {
//     id: "2",
//     title: "Ghostrunner 2",
//     slug: "ghostrunner-2",
//     releaseDate: "2024-01-01",
//     actualPrice: 2599,
//     offerPrice: 2209.15,
//     offerPercentage: "-15%",
//     image: "../assets/wishlist_images/wishlist1.PNG",
//     salesEndDate: "01/10/24",
//     salesEndTime: "9:30 PM",
//   },
// ];

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
            <button id="add2cart" onclick="">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  <br>
  `;
};
//<div class="remove-button"><a id="remove" href="#">Remove</a></div>
const displayWishlist = (games) => {
  // for (let i = tempWishlistArray.length - 1; i > 0; i--) {
  //   console.log(tempWishlistArray[i]);
  // }

  // console.log("inside wishlist", games);
  const wishlistContainer = document.querySelector(".wishlist-container");
  wishlistContainer.innerHTML = "";
  games.forEach((game) => {
    const wishlistDiv = document.createElement("div");
    wishlistDiv.className = "wishlist";
    wishlistDiv.innerHTML = wishListTemplate(game);

    wishlistContainer.appendChild(wishlistDiv);

    // Add event listener to the "Remove" button
    const removeButton = wishlistDiv.querySelector(".remove");
    removeButton.addEventListener("click", () =>
      removeWishlistInFirebase(game)
    );
  });
};

document.addEventListener("DOMContentLoaded", function () {
  // Call the function with the array of games
  setTimeout(() => displayWishlist(tempWishlistArray), 1000);
  // displayWishlist(tempWishlistArray);
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
// const removeWishlistItem = (index) => {

//   const wishlistContainer = document.querySelector(".wishlist-container");
//   const wishlistItems = wishlistContainer.querySelectorAll(".wishlist");

//   // Check if the index is valid
//   if (index >= 0 && index < wishlistItems.length) {
//     // Remove the wishlist item
//     wishlistItems[index].remove();
//   }
// };

const sortWishlistPageByAlphabetAsc = () => {
  tempWishlistArray.sort((a, b) => b.title.localeCompare(a.title));
  displayWishlist(tempWishlistArray);
};

const sortWishlistPageByAlphabetDesc = () => {
  tempWishlistArray.sort((a, b) => a.title.localeCompare(b.title));
  displayWishlist(tempWishlistArray);
};

const sortWishlistPageByPriceLowtoHigh = () => {
  tempWishlistArray.sort((a, b) => a.offerPrice - b.offerPrice);
  displayWishlist(tempWishlistArray);
};

const sortWishlistPageByPriceHightoLow = () => {
  tempWishlistArray.sort((a, b) => b.offerPrice - a.offerPrice);
  displayWishlist(tempWishlistArray);
};

const sortWishlistPageByRecentlyAdded = () => {
  tempWishlistArray.reverse();
  displayWishlist(tempWishlistArray);
};

document.getElementById("sortingtype").addEventListener("change", () => {
  sortWishlistPageByRecentlyAdded();
  displayWishlist(tempWishlistArray);
});

const manageOption = () => {
  let manageDiv = document.querySelector(".pl2");
  manageDiv.innerHTML = manageTemplate();
};

const manageTemplate = () => {
  return `
      <a href="#">Manage preferences</a>
      <i class="bi bi-box-arrow-up-right"></i>
    `;
};

// Add an event listener to the toggle button inside .preferences-right
const preferencesRight = document.querySelector(".preferences-right");
const toggleButton = preferencesRight.querySelector(".slider");
const pl1Div = document.querySelector(".pl1");

toggleButton.addEventListener("change", () => {
  // Set .pl1 class empty
  pl1Div.innerHTML = "";

  // Check if the toggle button is checked
  if (toggleButton.checked) {
    manageOption(); // Change the content of pl2 class to the template
  }
});

// document.getElementById("filter_by_action").addEventListener("click", () => {
//   filterWishlistPageByGenre("action");
// });
// document.getElementById("filter_by_indie").addEventListener("click", () => {
//   filterWishlistPageByGenre("indie");
// });

// document.getElementById("filter_by_adventure").addEventListener("click", () => {
//   filterWishlistPageByGenre("adventure");
// });

// document.getElementById("filter_by_rpg").addEventListener("click", () => {
//   filterWishlistPageByGenre("rpg");
// });

// document.getElementById("filter_by_strategy").addEventListener("click", () => {
//   filterWishlistPageByGenre("strategy");
// });

// document.getElementById("filter_by_shooter").addEventListener("click", () => {
//   filterWishlistPageByGenre("shooter");
// });

// document.getElementById("filter_by_casual").addEventListener("click", () => {
//   filterWishlistPageByGenre("casual");
// });

// document.getElementById("filter_by_puzzle").addEventListener("click", () => {
//   filterWishlistPageByGenre("puzzle");
// });

// document.getElementById("filter_by_arcade").addEventListener("click", () => {
//   filterWishlistPageByGenre("arcade");
// });

// document
//   .getElementById("filter_by_platformer")
//   .addEventListener("click", () => {
//     filterWishlistPageByGenre("platformer");
//   });

// document
//   .getElementById("filter_by_massive-multiplayer")
//   .addEventListener("click", () => {
//     filterWishlistPageByGenre("massive-multiplayer");
//   });

// document.getElementById("filter_by_racing").addEventListener("click", () => {
//   filterWishlistPageByGenre("racing");
// });

// document.getElementById("filter_by_sports").addEventListener("click", () => {
//   filterWishlistPageByGenre("sports");
// });

// document.getElementById("filter_by_fighting").addEventListener("click", () => {
//   filterWishlistPageByGenre("fighting");
// });

// document.getElementById("filter_by_family").addEventListener("click", () => {
//   filterWishlistPageByGenre("family");
// });

// document
//   .getElementById("filter_by_board-games")
//   .addEventListener("click", () => {
//     filterWishlistPageByGenre("board-games");
//   });

// document
//   .getElementById("filter_by_educational")
//   .addEventListener("click", () => {
//     filterWishlistPageByGenre("educational");
//   });

// document.getElementById("filter_by_card").addEventListener("click", () => {
//   filterWishlistPageByGenre("card");
// });

// const filterWishlistPageByFeatures = (feature) => {
//   const parameterList = [
//     ["platforms", "4"],
//     ["tags", feature],
//     ["ordering", "-metacritic"],
//   ];
//   loadBrowsePage(parameterList);
//   console.log(feature);
// };

// document.getElementById("filter_by_sp").addEventListener("click", () => {
//   filterWishlistPageByFeatures("singleplayer");
// });

// document.getElementById("filter_by_sa").addEventListener("click", () => {
//   filterWishlistPageByFeatures("steam-achievements");
// });

// document.getElementById("filter_by_mp").addEventListener("click", () => {
//   filterWishlistPageByFeatures("multiplayer");
// });

// document.getElementById("filter_by_fcsupport").addEventListener("click", () => {
//   filterWishlistPageByFeatures("full-controller-support");
// });

// document
//   .getElementById("filter_by_steamcloud")
//   .addEventListener("click", () => {
//     filterWishlistPageByFeatures("steam-cloud");
//   });

// document
//   .getElementById("filter_by_atmospheric")
//   .addEventListener("click", () => {
//     filterWishlistPageByFeatures("atmospheric");
//   });

// document
//   .getElementById("filter_by_stradingcards")
//   .addEventListener("click", () => {
//     filterWishlistPageByFeatures("steam-trading-cards");
//   });

// document
//   .getElementById("filter_by_greatsoundtrack")
//   .addEventListener("click", () => {
//     filterWishlistPageByFeatures("great-soundtrack");
//   });

// document.getElementById("filter_by_rpg").addEventListener("click", () => {
//   filterWishlistPageByFeatures("rpg");
// });

// document.getElementById("filter_by_coop").addEventListener("click", () => {
//   filterWishlistPageByFeatures("co-op");
// });
