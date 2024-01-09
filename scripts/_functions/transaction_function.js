import { API_KEY } from "../../environment.js";
// import axios from "https://cdn.skypack.dev/axios";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import getPrice from "./getprice"; // Adjust the path accordingly

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
const database = getFirestore(app);
let dbref = null;

export const addtoTransactionInFirebase = async (obj) => {
  try {
    // console.log(API_KEY);
    // const baseUrl =
    //   "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
    // const response = await axios.get(baseUrl);
    // const data = response.data;

    // // Fetch pricing information using the getPrice function
    // // const prices = await getPrice(data.name);
    // const prices = {
    //   salePrice: 1000,
    //   retailPrice: 1500,
    //   calculatedDiscount: 15,
    // };

    // let obj = {
    //   id: data.id,
    //   title: data.name,
    //   slug: data.slug,
    //   actualPrice: prices.salePrice,
    // };

    await updateTransactionInFirebase(obj);
  } catch (error) {
    console.error("Error adding to Transaction in Firebase:", error);
  }
};

const updateTransactionInFirebase = async (game) => {
  try {
    dbref = doc(database, "UsersData", localStorage.getItem("userId"));
    const docSnapshot = await getDoc(dbref);
    let tempTransactionArray = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempTransactionArray = [...userData.Transactions];
    }

    let isGamePresent = false;
    for (let i = 0; i < tempTransactionArray.length; i++) {
      if (tempTransactionArray[i].slug === game.slug) {
        isGamePresent = true;
        break;
      }
    }

    if (!isGamePresent) {
      tempTransactionArray.push(game);
      await updateDoc(dbref, { Transactions: tempTransactionArray });
      console.log(`Game with slug ${game.slug} added to the TransactionList.`);
    } else {
      console.log(
        `Game with slug ${game.slug} is already in the TransactionList.`
      );
    }
  } catch (error) {
    console.error("Error updating Transaction in Firebase:", error);
  }
};

export const getTransactionList = async () => {
  dbref = doc(database, "UsersData", localStorage.getItem("userId"));
  const docSnapshot = await getDoc(dbref);
  let tempTransactionArray = [];

  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();
    tempTransactionArray = userData.Transactions;
  }
  return tempTransactionArray;
};

// Example usage
// const gameSlug = "dishonored"; // Replace with the actual game slug
// addtoTransactionInFirebase(gameSlug);
