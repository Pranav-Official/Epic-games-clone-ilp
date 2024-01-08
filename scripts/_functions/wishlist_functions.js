// import fetchSingleGameData from "../game_info/gameinfo_fetch.js";
import { API_KEY } from "../../environment.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import axios from "axios";

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

//updating wishlist items in firebase
// const updateWishlistInFirebase = async (game) => {
//   tempWishlistArray.push(game);
//   await updateDoc(dbref, { Wishlist: tempWishlistArray });
// };
const updateWishlistInFirebase = async (game) => {
  let tempWishlistArray = [];
  let wishlistItems = [];

  try {
    const docSnapshot = await getDoc(dbref);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      wishlistItems = userData.Wishlist;
      console.log(tempWishlistArray);
      tempWishlistArray = [...wishlistItems];
    }

    let isGamePresent = false;
    for (let i = 0; i < tempWishlistArray.length; i++) {
      if (tempWishlistArray[i].slug == game.slug) {
        isGamePresent = true;
      }
    }

    if (!isGamePresent) {
      tempWishlistArray.push(game);
      console.log(tempWishlistArray);
      await updateDoc(dbref, { Wishlist: tempWishlistArray });
    } else {
      console.log(`Game with slug ${game.slug} is already in the wishlist.`);
    }
  } catch (error) {
    console.error("Error updating wishlist in Firebase:", error);
  }
};

//removing wishlist item from firebase
const removeWishlistInFirebase = async (gameSlug) => {
  let tempWishlistArray = [];
  //storing the wishlist to a temporary array
  getDoc(dbref).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempWishlistArray = userData.Wishlist;
      console.log(tempWishlistArray);
    }
  });
  let updatedWishlistArray = tempWishlistArray.filter(
    (singlegame) => singlegame != gameSlug
  );
  await updateDoc(dbref, { Wishlist: updatedWishlistArray });
};

export const addToWishlist = async (gameSlug) => {
  const baseUrl =
    "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
  const response = await axios.get(baseUrl);
  const data = response.data;
  const gameTagsArray = data.tags;
  let tempTagArray = [];
  gameTagsArray.forEach((tag) => {
    tempTagArray.push(tag.slug);
  });
  //   let prices = await getPrice(gameSlug);
  const prices = {
    retailPrice: 4700,
    salePrice: 3500,
    calculatedDiscount: 15,
  };
  let obj = {
    id: data.id,
    title: data.name,
    slug: data.slug,
    releaseDate: data.released,
    actualPrice: prices.retailPrice,
    offerPrice: prices.salePrice,
    tags: tempTagArray,
    offerPercentage: "-" + Math.trunc(prices.calculatedDiscount) + "%",
    image: data.background_image,
    salesEndDate: data.updated, //2024-01-04T16:43:18
    salesEndTime: data.updated,
  };
  updateWishlistInFirebase(obj);
};

const wishlistItemCount = async () => {
  let countWishlist = 0;
  let wishlistArray = [];
  try {
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      wishlistArray = userData.Wishlist;
      countWishlist = wishlistArray.length;
    }
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
  console.log(countWishlist);
  return countWishlist;
};
wishlistItemCount();
