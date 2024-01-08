import { addToWishlist } from "../_functions/wishlist_functions.js";

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

//storing the wishlist to a temporary array
// getDoc(dbref).then((docSnapshot) => {
//   if (docSnapshot.exists()) {
//     const userData = docSnapshot.data();
//     tempWishlistArray = userData.Wishlist;
//     console.log(tempWishlistArray);
//   }
// });

const wishlistPage = async () => {
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempWishlistArray = userData.Wishlist;
    }
    console.log(tempWishlistArray);
    displayWishlist(tempWishlistArray);
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
};
//updating wishlist items in firebase
// const updateWishlistInFirebase = async (game) => {
//   tempWishlistArray.push(game);
//   await updateDoc(dbref, { Wishlist: tempWishlistArray });
// };
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

//removing wishlist item from firebase
const removeWishlistInFirebase = async (game) => {
  {
    let updatedWishlistArray = tempWishlistArray.filter(
      (singlegame) => singlegame != game
    );
    await updateDoc(dbref, { Wishlist: updatedWishlistArray });
    window.location.reload();
  }
};
// const removeWishlistInFirebase = async (game) => {
//   const removedGameTitle = game.title;

//   let updatedWishlistArray = tempWishlistArray.filter(
//     (singlegame) => singlegame != game
//   );
//   await updateDoc(dbref, { Wishlist: updatedWishlistArray });
//   setTimeout(() => {
//     displayWishlist(tempWishlistArray);
//   }, 2000);
//   // Display a message
//   setTimeout(() => {
//     const messageContainer = document.getElementById("message-container");
//     messageContainer.innerHTML = `<p>${removedGameTitle} is removed.</p><button id="undo-button">Undo</button>`;
//   }, 3000);

//   // Handle undo button click
//   const undoButton = document.getElementById("undo-button");
//   undoButton.addEventListener("click", () => {
//     // Add the removed game back to the wishlist
//     tempWishlistArray.push(game);
//     // Update the document in Firebase
//     updateDoc(dbref, { Wishlist: tempWishlistArray });

//     // Remove the message
//     messageContainer.innerHTML = "";

//     // Refresh the wishlist display
//     displayWishlist(tempWishlistArray);
//   });

//   // Reload the page after a certain time if undo is not clicked
//   setTimeout(() => {
//     messageContainer.innerHTML = "";
//     window.location.reload();
//   }, 5000);
// };

let obj = {
  id: "4",
  title: "ZGhosdarunner 2",
  slug: "ghostrunner-4",
  releaseDate: "2024-01-01",
  actualPrice: 499,
  offerPrice: 709.15,
  offerPercentage: "-15%",
  image: "../assets/wishlist_images/wishlist1.PNG",
  salesEndDate: "01/10/24",
  salesEndTime: "9:30 PM",
};

// setTimeout(() => {
//   updateWishlistInFirebase(obj);
// }, 2000);

//creating template for wishlist
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
            <div><p id="sales">Sale ends ${formatDate(
              wishlistItem.salesEndDate
            )} at ${formatDate(wishlistItem.salesEndTime)}</p></div>
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

//function to display wishlist in wishlist page
const displayWishlist = (games) => {
  // addToWishlist();
  const wishlistContainer = document.querySelector(".wishlist-container");
  wishlistContainer.innerHTML = "";
  games.forEach((game) => {
    console.log(game);
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
  setTimeout(() => wishlistPage(), 10);
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
  tempWishlistArray.reverse();
  displayWishlist(tempWishlistArray);
};

//calling wishlist sorting
// document.getElementById("sortingtype").addEventListener("change", () => {
//   sortWishlistPageByRecentlyAdded();
//   displayWishlist(tempWishlistArray);
// });

// Function to format date as "dd/mm/yyyy"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const year = date.getFullYear();
  return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};

// Function to format time as "HH:MM" (IST)
const formatTime = (timeString) => {
  const time = new Date(timeString);
  const hours = time.getHours() + 5; // IST offset
  const minutes = time.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
function manageOption() {
  // Hide element with class 'pl1'
  const manageDiv = document.getElementById("pl1");
  manageDiv.style.visibility = "hidden";

  // Show element with class 'pl2'
  manageDiv2 = document.getElementById("pl2");
  manageDiv2.style.visibility = "visible";

  console.log("button working");
}

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

await addToWishlist("ghostrunner");
