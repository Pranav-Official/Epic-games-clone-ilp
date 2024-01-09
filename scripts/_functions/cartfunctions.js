import { API_KEY, firebaseConfig } from "../../environment.js";
import getPrice from "./getprice.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let userData, cartItems;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
let dbref = null;

const addtoCartInFirebase = async (game) => {
  let tempCartArray = [];
  let cartItems = [];
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      cartItems = userData.Cart;
      console.log(cartItems);

      // Copy cartItems to tempCartArray using the spread operator
      tempCartArray = [...cartItems];
    }

    let isGameAlreadyInCart = false;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].slug == game.slug) {
        isGameAlreadyInCart = true;
      }
    }

    if (!isGameAlreadyInCart) {
      // If the game is not already in the cart, add it
      tempCartArray.push(game);
      console.log(tempCartArray);
      await updateDoc(dbref, { Cart: tempCartArray });
    } else {
      console.log(`Game with slug ${game.slug} is already in the cart.`);
    }
  } catch (error) {
    console.error("Error updating cart in Firebase:", error);
  }
};

export const addToCart = async (gameSlug) => {
  try {
    // Fetch game data using the slug
    const baseUrl =
      "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
    const response = await axios.get(baseUrl);
    const data = response.data;
    // let prices = await getPrice(gameSlug);
    let prices = {
      salePrice: 1599,
      retailPrice: 2599,
      calculatedDiscount: 15,
    };
    // Add the game to the cart in Firebase
    const game = {
      // Customize properties based on your game data structure
      title: data.name,
      slug: data.slug,
      background_image: data.background_image,
      retailPrice: prices.retailPrice,
      salePrice: prices.salePrice,
      calculatedDiscount: prices.calculatedDiscount,

      // Add other properties as needed
    };
    console.log(data.background_image);

    await addtoCartInFirebase(game);
    console.log(`Game "${game.title}" added to the cart in Firebase.`);
  } catch (error) {
    console.error("Error adding game to the cart:", error);
  }
};

export const fetchFullCart = async () => {
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref); // Fetch the document snapshot

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const cartItems = userData.Cart;
      return cartItems;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in fetching Cart:", error);
  }
};

export const cartItemCount = async () => {
  let countCartlist = 0;
  let cartlistArray = [];
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      cartlistArray = userData.Cart;
      countCartlist = cartlistArray.length;
    }
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
  // console.log(countWishlist);
  return countCartlist;
};
