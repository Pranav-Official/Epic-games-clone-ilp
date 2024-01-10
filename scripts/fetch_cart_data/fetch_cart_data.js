import { API_KEY, firebaseConfig } from "../../environment.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// Uncomment the line below if using npm to install axios
// import axios from 'axios';

// Firebase configuration

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const dbref = doc(database, "UsersData", "josin@gmail.com");

async function generateCheckout() {
  try {
    const cartData = await fetchCartData();
    console.log("Cart Data:", cartData);
    // Add code to display cart data here
  } catch (error) {
    console.error("Error generating checkout:", error);
  }
}

async function fetchCartData() {
  try {
    const docSnapshot = await getDoc(dbref);
    let tempCartArray = [];
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      if (userData.Cart) {
        tempCartArray = [...userData.Cart];
      }
    }
    return tempCartArray;
  } catch (error) {
    console.log("Error fetching cart data:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

async function addGametoCartList(gameSlug) {
  try {
    const gameData = await fetchGameData(gameSlug);
    let game = {
      backgroundimage: gameData.background_image,
      actualPrice: prices.salePrice, // Update this variable with the correct value
      title: gameData.name,
      slug: gameData.slug,
    };
    await updateCartInFirebase(game);
  } catch (error) {
    console.error("Error adding game to cart list:", error);
  }
}

async function removeGameFromCart(gameSlug) {
  try {
    const docSnapshot = await getDoc(dbref);
    let tempCartArray = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      if (userData.Cart) {
        tempCartArray = [...userData.Cart];

        // Find the index of the game in the cart
        const indexToRemove = tempCartArray.findIndex(
          (item) => item.slug === gameSlug
        );

        // Remove the game if found
        if (indexToRemove !== -1) {
          tempCartArray.splice(indexToRemove, 1);
          await dbref.update({ Cart: tempCartArray });
          console.log(`Game with slug ${gameSlug} removed from cart.`);
        } else {
          console.log(`Game with slug ${gameSlug} not found in cart.`);
        }
      }
    }
  } catch (error) {
    console.error("Error removing game from cart in Firebase:", error);
  }
}

async function fetchGameData(gameSlug) {
  const baseUrl =
    "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
  const response = await axios.get(baseUrl);
  return response.data;
}

async function updateCartInFirebase(game) {
  try {
    const docSnapshot = await getDoc(dbref);
    let tempCartArray = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempCartArray = userData.Cart ? [...userData.Cart] : [];
    }

    let isGamePresent = tempCartArray.some((item) => item.slug === game.slug);

    if (!isGamePresent) {
      tempCartArray.push(game);
      await dbref.update({ Cart: tempCartArray });
      console.log(`Game with slug ${game.slug} added to checkout.`);
    } else {
      console.log(`Game with slug ${game.slug} is already added.`);
    }
  } catch (error) {
    console.error("Error updating cart in Firebase:", error);
  }
}

// Example usage to remove a game from the cart
// Replace 'gameSlugToRemove' with the actual game slug you want to remove
removeGameFromCart("gameSlugToRemove");

// Example usage to add a game to the cart
// Replace 'gameSlugToAdd' with the actual game slug you want to add
addGametoCartList("gameSlugToAdd");

// Example usage to generate and display checkout
generateCheckout();
