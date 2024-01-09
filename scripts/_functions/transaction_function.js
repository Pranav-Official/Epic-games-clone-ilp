import { API_KEY, FIRE_BASE_KEY, firebaseConfig } from "../../environment.js";
import { removeCartInFirebase, clearCartInFirebase } from "./cartfunctions.js";
import { removeWishlistInFirebaseBulk } from "./wishlist_functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// import axios from "https://cdn.skypack.dev/axios";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

let dbref = null;

export const addtoTransactionInFirebase = async (obj) => {
  try {

    await updateTransactionInFirebase(obj);
    await removeCartInFirebase(obj.slug);
  } catch (error) {
    console.error("Error adding to Transaction in Firebase:", error);
  }
};

export const addtoTransactionInFirebaseBulk = async (objList) => {
  try {
    await updateTransactionInFirebaseBulk(objList);
    await clearCartInFirebase();
    await removeWishlistInFirebaseBulk(objList);
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

      // Check if userData.Transactions is defined and is an array
      if (
        userData &&
        userData.Transactions &&
        Array.isArray(userData.Transactions)
      ) {
        tempTransactionArray = [...userData.Transactions];
      } else {
        // If not defined or not an array, initialize it as an empty array
        userData.Transactions = [];
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
        console.log(
          `Game with slug ${game.slug} added to the TransactionList.`
        );
      } else {
        console.log(
          `Game with slug ${game.slug} is already in the TransactionList.`
        );
      }
    } else {
      console.error("User document does not exist");
      // Handle the situation where the user document does not exist
    }
  } catch (error) {
    console.error("Error updating Transaction in Firebase:", error);
  }
};

const updateTransactionInFirebaseBulk = async (games) => {
  try {
    dbref = doc(database, "UsersData", localStorage.getItem("userId"));
    const docSnapshot = await getDoc(dbref);
    let tempTransactionArray = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();

      // Check if userData.Transactions is defined and is an array
      if (
        userData &&
        userData.Transactions &&
        Array.isArray(userData.Transactions)
      ) {
        tempTransactionArray = [...userData.Transactions];
      } else {
        // If not defined or not an array, initialize it as an empty array
        userData.Transactions = [];
      }

      for (const game of games) {
        let isGamePresent = false;
        for (let i = 0; i < tempTransactionArray.length; i++) {
          if (tempTransactionArray[i].slug === game.slug) {
            isGamePresent = true;
            break;
          }
        }

        if (!isGamePresent) {
          tempTransactionArray.push(game);
          console.log(
            `Game with slug ${game.slug} added to the TransactionList.`
          );
        } else {
          console.log(
            `Game with slug ${game.slug} is already in the TransactionList.`
          );
        }
      }

      await updateDoc(dbref, { Transactions: tempTransactionArray });
    } else {
      console.error("User document does not exist");
      // Handle the situation where the user document does not exist
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
// const gameSlug = "baldurs-gate-3"; // Replace with the actual game slug
// addtoTransactionInFirebase(gameSlug);
