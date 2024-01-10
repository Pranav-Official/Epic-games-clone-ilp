// import fetchSingleGameData from "../game_info/gameinfo_fetch.js";
import { firebaseConfig } from "../../environment.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

let dbref = null;

//update wishlist in firebase
const updateWishlistInFirebase = async (game) => {
  let tempWishlistArray = [];
  let wishlistItems = [];

  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
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
      return true;
    } else {
      console.log(`Game with slug ${game.slug} is already in the wishlist.`);
      return false;
    }
  } catch (error) {
    console.error("Error updating wishlist in Firebase:", error);
  }
};

//removing wishlist item from firebase
export const removeWishlistInFirebase = async (dataSlug) => {
  let tempWishlistArray = [];
  let updatedWishlistArray = [];
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      let wishlistItems = userData.Wishlist;
      // console.log(tempWishlistArray);
      tempWishlistArray = [...wishlistItems];
    }
    updatedWishlistArray = tempWishlistArray.filter(
      (singlegame) => singlegame.slug != dataSlug
    );
    await updateDoc(dbref, { Wishlist: updatedWishlistArray });
    // window.location.reload();
  } catch (error) {
    console.log("error removeing");
  }
};

export const removeWishlistInFirebaseBulk = async (gamesToRemove) => {
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      let wishlistItems = userData.Wishlist || [];

      // Create a Set of slugs to efficiently check for presence
      const slugsToRemove = new Set(gamesToRemove.map((game) => game.slug));

      // Filter out wishlist items that have a matching slug
      const updatedWishlistArray = wishlistItems.filter(
        (singleGame) => !slugsToRemove.has(singleGame.slug)
      );

      await updateDoc(dbref, { Wishlist: updatedWishlistArray });
      console.log("Wishlist updated successfully");
    } else {
      console.error("User document does not exist");
      // Handle the situation where the user document does not exist
    }
  } catch (error) {
    console.error("Error updating Wishlist in Firebase:", error);
  }
};

//add to wishlist
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
  const gameGenresArray = data.genres;
  let tempGenreArray = [];
  gameGenresArray.forEach((genre) => {
    tempGenreArray.push(genre.slug);
  });
  //   let prices = await getPrice(gameSlug);
  const prices = {
    retailPrice: 3000,
    salePrice: 650,
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
    genres: tempGenreArray,
    offerPercentage: "-" + Math.trunc(prices.calculatedDiscount) + "%",
    image: data.background_image,
    updatedDate: data.released,
    updatedTime: data.updated,
  };
  const result = await updateWishlistInFirebase(obj);
  return result;
};

//count wishlist items

export const wishlistItemCount = async () => {
  let countWishlist = 0;
  let wishlistArray = [];
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      wishlistArray = userData.Wishlist;
      countWishlist = wishlistArray.length;
    }
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
  // console.log(countWishlist);
  return countWishlist;
};
wishlistItemCount();

export const displayWishlistSlugs = async () => {
  let wishlistArray = [];
  let wishlistSlugArray = [];
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "UsersData", userId);
    const docSnapshot = await getDoc(dbref);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      wishlistArray = userData.Wishlist;

      wishlistArray.forEach((item) => {
        wishlistSlugArray.push(item.slug);
        console.log(wishlistSlugArray);
      });
      return wishlistSlugArray;
    }
  } catch (error) {
    console.log("error fetching data from user" + error);
  }
};
