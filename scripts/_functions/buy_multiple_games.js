import { API_KEY, firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dbref = doc(db, "UsersData", "anlysolly@gmail.com");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  fetchAndDisplayCartItems();
});

const activeEmail = "anlysolly@gmail.com";

const multipleGameTemplate = (cartItem) => {
  return `
    <div class="payment-offer-summary">
      <div class="payment-offer-summary__thumbnail-image">
        <img
          alt="Selected Game Thumbnail"
          src="${cartItem.background_image}"
          class="payment-offer-summary__thumbnail"
          id="cart-game-image"
        />
      </div>
      <div class="payment-offer-summary__content">
        <h2 class="payment-offer-summary__title" id="cart-title">
          ${cartItem.title}
        </h2>
      </div>
    </div>
  `;
};

const fetchAndDisplayCartItems = async () => {
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const cartItems = userData && userData.Cart ? userData.Cart : [];

      const gamesDiv = document.getElementById("games-div");
      gamesDiv.innerHTML = ""; // Clear existing content
      console.log("Ddada");
      cartItems.forEach((cartItem) => {

        // Create a new div for each cart item
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("payment-offer-summary");

        // Create thumbnail image element
        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = cartItem.background_image;
        thumbnailImage.alt = "Selected Game Thumbnail";
        thumbnailImage.classList.add("payment-offer-summary__thumbnail");
        thumbnailImage.id = "cart-game-image";

        // Create content container
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("payment-offer-summary__content");

        // Create title element
        const titleElement = document.createElement("h2");
        titleElement.classList.add("payment-offer-summary__title");
        titleElement.id = "cart-title";
        titleElement.textContent = cartItem.title;

        // Append elements to content container
        contentDiv.appendChild(titleElement);

        // Append elements to game div
        gameDiv.appendChild(thumbnailImage);
        gameDiv.appendChild(contentDiv);

        // Append game div to gamesDiv
        gamesDiv.appendChild(gameDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching", error);
  }
};
// ... (your existing functions)

// Ensure that these lines are inside a function or the top-level code
// try {
//   const docSnapshot = await getDoc(dbref);
//   if (docSnapshot.exists()) {
//     const userData = docSnapshot.data();
//     const cartItems = userData && userData.Cart ? userData.Cart : [];
//     displayMultipleGameInDOM(cartItems);
//   }
// } catch (error) {
//   console.error("Error fetching", error);
// }

// ... (your existing code)

const buyMultipleGame = async () => {
  // ... (your existing code)

  const gameSlug = localStorage.getItem("gameSlug-info");
  const data = await fetchGameData(gameSlug);
  let price = await getPrice(gameSlug);

  if (price == "null") {
    price = {
      salePrice: 1000,
      retailPrice: 800,
      calculatedDiscount: 20,
    };
  }

  const gameData = {
    id: data.id,
    slug: data.slug,
    name: data.name,
    background_image: data.background_image,
    retailPrice: price.retailPrice,
    salePrice: price.salePrice,
  };

  // Update the cart in Firestore with the new game data
  await addtoTransactionInFirebase(gameData);

  // Fetch the updated cart data from Firestore
  const updatedCartData = await fetchFullCart();

  // Display the updated cart in the DOM
  displayMultipleGameInDOM(updatedCartData);
};

// ... (your existing code)
