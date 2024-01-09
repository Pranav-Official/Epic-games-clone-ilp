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
const auth = getAuth(app);
const db = getFirestore(app);
const dbref = doc(db, "UsersData", "anlysolly@gmail.com");

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
    discountPrice += game.salePrice || game.retailPrice;
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
            <span id="discount-price">&#8377;${discountPrice}</span>
          </p>
        </div>
        <span class="payment-price__label">VAT included if applicable</span>
        <hr class="payment-order-summary__divider" />
        <div class="payment-price">
          <p class="payment-price__label payment-price__label--UPAY">
            <span>Total</span>
          </p>
          <p class="payment-price__value payment-price__value--UPAY">
            <span id="Total-price">&#8377;${totalPrice - discountPrice}</span>
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
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const cartItems = userData && userData.Cart ? userData.Cart : [];

      // Call the function to display prices in the DOM
      await displayPriceInDOM(cartItems);
    }
  } catch (error) {
    console.error("Error fetching", error);
  }
};
