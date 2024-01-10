import { API_KEY, firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  addtoTransactionInFirebase,
  addtoTransactionInFirebaseBulk,
} from "./transaction_function.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let dbref = null;

let globalCartItems = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  fetchAndDisplayCartItems();
});

const displayPriceInDOM = async (cartItems) => {
  const priceContainer = document.querySelector(".games-price-div");

  if (!priceContainer) {
    console.error("Error: Price container not found");
    return;
  }

  let totalPrice = 0;
  let discountPrice = 0;

  cartItems.forEach((game) => {
    totalPrice += game.retailPrice;
    discountPrice += game.salePrice;
  });
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

    const priceElement = document.createElement("p");
    priceElement.classList.add("payment-offer-price");
    priceElement.id = "cart-price";
    priceElement.textContent = "₹" + cartItem.retailPrice;

    // Append elements to content container
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(priceElement);

    // Append elements to game div
    gameDiv.appendChild(thumbnailImage);
    gameDiv.appendChild(contentDiv);

    // Append game div to gamesDiv
    gamesDiv.appendChild(gameDiv);
    globalCartItems.push(cartItem);
  });

  // HTML template for price details
  const multipleGamePrice = `
    <div class="payment-order-summary payment-summaries__order">
      <div class="payment-order-summary__prices">
        <div class="payment-price">
          <p class="payment-price__label">Price</p>
          <p class="payment-price__value">
            <span id="retail-price">&#8377;${totalPrice}</span>
          </p>
        </div>
        <div class="payment-price">
          <p class="payment-price__label">Discount Price</p>
          <p class="payment-price__value">
            -
            <span id="discount-price">&#8377;${
              totalPrice - discountPrice
            }</span>
          </p>
        </div>
        <span class="payment-price__label">VAT included if applicable</span>
        <hr class="payment-order-summary__divider" />
        <div class="payment-price">
          <p class="payment-price__label payment-price__label--UPAY">
            <span>Total</span>
          </p>
          <p class="payment-price__value payment-price__value--UPAY">
            <span id="Total-price">&#8377;${discountPrice}</span>
          </p>
        </div>
      </div>
    </div>
  `;

  // Set the price details to the container
  priceContainer.innerHTML = multipleGamePrice;
};
const fetchAndDisplayCartItems = async () => {
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(db, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const cartItems = userData && userData.Cart ? userData.Cart : [];

      // globalCartItems = [...cartItems];

      // Call the function to display prices in the DOM
      document.querySelector(".epic-account-name__name").textContent =
        userData.Display_Name;
      await displayPriceInDOM(cartItems);
    }
  } catch (error) {
    console.error("Error fetching", error);
  }
};

const placeOrderButton = async () => {
  await addtoTransactionInFirebaseBulk(globalCartItems);
};

document
  .getElementById("placeOrderButton")
  .addEventListener("click", async () => {
    await placeOrderButton();
  });
