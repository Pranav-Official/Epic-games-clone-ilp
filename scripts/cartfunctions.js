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

const cartTemplate = (cartItem) => {
  return `     <div class="game-details">
            <div class="left">
              <img src="${cartItem.image}">
              <div class="windows-icon">
                <i class="bi bi-windows"></i>
              </div>
            </div>
            <div class="right">
              <div class="base">
                <h2><b>BASE GAME</b></h2>
                <span class="price"><h6>&#8377;${cartItem.actualPrice}</h6> </span>
              </div>

              <h3>${cartItem.title}</h3>
              <br />
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10.3827 3.07523C10.2512 2.71987 9.74862 2.71987 9.61712 3.07523L8.69694 5.562C8.1595 7.01439 7.01439 8.1595 5.562 8.69694L3.07523 9.61712C2.71987 9.74862 2.71987 10.2512 3.07523 10.3827L5.562 11.3029C7.01439 11.8403 8.1595 12.9855 8.69694 14.4378L9.61712 16.9246C9.74862 17.28 10.2512 17.28 10.3827 16.9246L11.3029 14.4378C11.8403 12.9855 12.9855 11.8403 14.4378 11.3029L16.9246 10.3827C17.28 10.2512 17.28 9.74862 16.9246 9.61712L14.4378 8.69694C12.9855 8.1595 11.8403 7.01439 11.3029 5.562L10.3827 3.07523Z"
                  fill="currentColor"
                ></path>
              </svg>
              <h4>
                Earn a boosted 10% back in Epic Rewards, offer ends Jan<br />
                10.
              </h4>
              <br />
              <p>Self-refundable</p>
              <div class="qmark">
                <i class="bi bi-question-circle"></i>
              </div>
              <div class="cart-update">
                <i class="bi bi-plus-circle"></i>
                <a href="">Move to wishlist</a>
                <a href="">Remove</a>
              </div>
            </div>
          </div>
          `;
};

//Function to display the cart items in the DOM
const displayCartInDOM = (cartItems) => {
  const cartContainer = document.querySelector(".cart-whole");

  // Clear existing content in the Cart-container
  //   const cartDiv = document.createElement("div");
  //   cartDiv.className = "Cart";
  let cartHtml = ``;
  let gameHtml = ``;
  // Loop through each cart item, generate HTML, and append to the Cart-container
  cartItems.forEach((cartItem) => {
    gameHtml += cartTemplate(cartItem);
  });

  const gameSummary = `
    <div class="game-card-list"></div>
  <div class="summary">
            <h2>Games and Apps Summary</h2>

            <br />
            <div class="bill">
              <div class="bill-item">
                <h6>Price</h6>
                <span class="price">&#8377;${cartItems.actualPrice}</span>
              </div>
              <div class="bill-item">
                <h6>Taxes</h6>
                <p>Calculated at checkout</p>
              </div>

              <hr />
              <div class="bill-item">
                <h6><b>Subtotal</b></h6>
                <span class="price"><b>&#8377;${cartItems.actualPrice}</b></span>
              </div>
            </div>
            <button class="checkout-button"><b>CHECK OUT</b></button>
          </div>
        </div>`;
  cartHtml += gameSummary;
  cartContainer.innerHTML = cartHtml;
  const gameListContainer = document.querySelector(".game-card-list");
  gameListContainer.innerHTML = gameHtml;
};

// Fetch data from Firestore
getDoc(dbref).then((docSnapshot) => {
  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();
    const cartItems = userData.Cart;
    console.log(cartItems);

    // Display cart items in the DOM
    displayCartInDOM(cartItems);
  }
});
