import { addToCart } from "./_functions/cartfunctions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let userData, cartItems;
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
let tempCartArray = [];

const cartTemplate = (cartItem) => {
  return `  <div class="game-details" slug="${cartItem.slug}">
            <div class="left">
              <img id="cartGameImage" src="${cartItem.background_image}">
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
                <a class="remove-from-cart-button">Remove</a>
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

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;

    cartItems.forEach((game) => {
      totalPrice += game.actualPrice;
    });

    return totalPrice;
  };
  const totalPrice = calculateTotalPrice(cartItems);

  const gameSummary = `
    <div class="game-card-list" ></div>
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
const fetchFirestoreData = async () => {
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      userData = docSnapshot.data();
      cartItems = userData.Cart;
      const cartWholeContainer = document.querySelector(".cart-whole");

      if (cartItems.length === 0) {
        // If the cart is empty, display the empty cart template
        const emptyCartTemplate = `
          <div class="empty-cart">
  <br />
  <br />
  <div class="empty-icon">
    <span class="css-14aopxi" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="svg css-uwwqev"
        viewBox="0 0 45 52"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            d="M4.058 0C1.094 0 0 1.098 0 4.075v35.922c0 .338.013.65.043.94.068.65-.043 1.934 2.285 2.96 1.553.683 7.62 3.208 18.203 7.573 1.024.428 1.313.529 2.081.529.685.013 1.137-.099 2.072-.53 10.59-4.227 16.66-6.752 18.213-7.573 2.327-1.23 2.097-3.561 2.097-3.899V4.075C44.994 1.098 44.13 0 41.166 0H4.058z"
            fill="currentColor"
          ></path>
          <path
            stroke="#FFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 18l4.91 2.545-2.455 4M25.544 28.705c-1.056-.131-1.806-.14-2.25-.025-.444.115-1.209.514-2.294 1.197M29.09 21.727L25 19.5l2.045-3.5"
          ></path>
        </g>
      </svg>
    </span>
  </div>
  <div class="empty-cart-message">
    <span class="message">
      <span>Your cart is empty</span>
    </span>
  </div>
  <div class="shop-page">
    <a href="./browse_page.html">Shop for Games & Apps </a>
  </div>
</div>

        `;

        // Set the HTML content of the cartWholeContainer to the empty cart template
        cartWholeContainer.innerHTML = emptyCartTemplate;
      } else {
        // If the cart is not empty, display the cart items
        displayCartInDOM(cartItems);
      }
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
};

// Call the function to fetch data from Firestore
fetchFirestoreData();

const addtoCartInFirebase = async (game) => {
  let tempCartArray = [];
  let cartItems = [];
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      cartItems = userData.Cart;
      console.log(cartItems);

      cartItems.forEach((games) => {
        tempCartArray.push(games);
      });
    }
    const isGameAlreadyInCart = cartItems.some(
      (cartGame) => cartGame.slug == game.slug
    );

    if (!isGameAlreadyInCart) {
      // If the game is not already in the cart, add it
      cartItems.forEach((cartGame) => {
        tempCartArray.push(cartGame);
      });

      tempCartArray.push(game);
      await updateDoc(dbref, { Cart: tempCartArray });
    } else {
      console.log(`Game with slug ${game.slug} is already in the cart.`);
    }
    // await updateDoc(dbref, { Cart: tempCartArray });
  } catch (error) {
    console.error("Error updating cart in Firebase:", error);
  }
};

const removeCartInFirebase = async (slug) => {
  let tempCartArray = [];
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const cartItems = userData.Cart;
      console.log(cartItems);

      cartItems.forEach((games) => {
        tempCartArray.push(games);
      });
    }
    let updatedCartArray = tempCartArray.filter(
      (singlegame) => singlegame.slug != slug
    );

    await updateDoc(dbref, { Cart: updatedCartArray });
  } catch (error) {
    console.error("Error updating cart in Firebase:", error);
  }
};

let obj1 = {
  actualPrice: 2599,
  id: "1",
  image: "../assets/wishlist_images/wishlist1.PNG",
  offerPercentage: "-15%",
  offerPrice: 2209.15,
  releaseDate: "2024-01-01",
  salesEndDate: "01/10/24",
  salesEndTime: "9:30 PM",
  slug: "ghostrunner-2",
  title: "Gh 3",
};

// addtoCartInFirebase(obj1);
// removeCartInFirebase("ghostrunner-2");

const removeFromCartClicked = async (slug) => {
  await removeCartInFirebase(slug);
  window.location.reload();
  // You can also update the UI or perform any other actions as needed
};

// Add event listeners to all remove buttons
document.querySelector(".cart-container").addEventListener("click", (event) => {
  if (event.target.matches(".remove-from-cart-button")) {
    // Retrieve the slug from the data attribute of the parent game card
    const cartGameCard = event.target.closest(".game-details");
    const cardSlug = cartGameCard.getAttribute("slug");
    console.log("button-press");
    // Call the removeFromCartClicked function with the slug
    removeFromCartClicked(cardSlug);
  }
});

await addToCart("grand-theft-auto-v");

// const cartGameImage = document.getElementById("cartGameImage");
// // Add a click event listener to the cart game image
// cartGameImage.addEventListener("click", () => {
//   // Get the slug or other identifier of the game from your cart data
//   const gameSlug = game.slug; // Assuming 'slug' is used as an identifier

//   // Redirect to the game page with the slug
//   window.location.href = `pages\gameinfo.html\${gameSlug}`; // Replace with the actual path of your game page
// });
