// Import necessary modules and libraries
import { API_KEY,firebaseConfig } from "../../environment.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const dbref = doc(database, "UsersData", "anlysolly@gmail.com");

// Function to generate the table
async function generateTransactionTable() {
  try {
    // Fetch data from Firestore
    const transactionData = await fetchTransactionData();

    console.log(transactionData);

    // Table heading
    let tableHTML = '<table class="table" border="1"><tr>';
    tableHTML += `<th scope="col">Transaction date</th>`;
    tableHTML += `<th scope="col">Game Title</th>`;
    tableHTML += `<th scope="col">Game ID</th>`;
    tableHTML += `<th scope="col">Price</th>`;
    tableHTML += "</tr>";

    // Table data
    transactionData.forEach((row) => {
      tableHTML += "<tr>";
      tableHTML += `<td scope="row">${row["date"]}</td>`;
      tableHTML += `<td class="table-game-title" scope="row">${row["name"]}</td>`;
      tableHTML += `<td scope="row">${row["slug"]}</td>`;
      tableHTML += `<td scope="row">${row["retailPrice"]}</td>`;
      tableHTML += "</tr>";
    });
    tableHTML += "</table>";
    document.getElementById("transactionTableContainer").innerHTML = tableHTML;
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
}
// Function to fetch data from Firestore
async function fetchTransactionData() {
  try {
    const docSnapshot = await getDoc(dbref);
    let tempTransactionArray = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempTransactionArray = [...userData.Transactions];
    }
    return tempTransactionArray;
  } catch (error) {
    console.log(`no transactions found`);
  }
}

// Function to add a game to the transaction list
async function addGameToTransactionList(gameSlug) {
  try {
    const gameData = await fetchGameData(gameSlug);
    let game = {
      id: gameData.id,
      title: gameData.name,
      slug: gameData.slug,
      actualPrice: prices.salePrice,
    };

    await updateTransactionInFirebase(game);
    generateTransactionTable(); // Regenerate the table after adding the game
  } catch (error) {
    console.error("Error adding game to transaction list:", error);
  }
}

// Function to fetch game data from the Rawg API
async function fetchGameData(gameSlug) {
  // Replace this placeholder with your actual Rawg API key
  const baseUrl =
    "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
  const response = await axios.get(baseUrl);
  return response.data;
}

// Function to update transaction in Firebase
async function updateTransactionInFirebase(game) {
  try {
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
      await dbref.update({ Transactions: tempTransactionArray });
      console.log(`Game with slug ${game.slug} added to the TransactionList.`);
    } else {
      console.log(
        `Game with slug ${game.slug} is already in the TransactionList.`
      );
    }
  } catch (error) {
    console.error("Error updating Transaction in Firebase:", error);
  }
}
// Call the function to generate the initial table
generateTransactionTable();
