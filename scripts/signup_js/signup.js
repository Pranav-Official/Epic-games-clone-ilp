import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
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

//Function to change the email in the locked email field
const updateMailLockedField = () => {
  const email = sessionStorage.getItem("email");
  const lockedMail = document.getElementById("email-inputed");
  console.log(email);
  lockedMail.innerText = email;
};
document.addEventListener("DOMContentLoaded", updateMailLockedField);

//function to
function signup() {
  const email = sessionStorage.getItem("email");
  const password = document.getElementById("password-field").value;
  const firstName = document.getElementById("first-name-input").value;
  const lastName = document.getElementById("last-name-input").value;
  const displayName = document.getElementById("display-name-inputed").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      window.alert("Success! Account created");
      // Call the function to create user data in Firestore
      createUserData(email, firstName, lastName, displayName);
    })
    .catch((error) => {
      console.log(error);
      window.alert("Error occured! Try Again!");
    });
}

document.getElementById("signup-button").addEventListener("click", signup);


//function to create document with user data in firestore
function createUserData(email, firstName, lastName, displayName) {
  // Collection reference
  const usersDataCollection = collection(database, "UsersData");

  // Document reference with email as the document name
  const userDocRef = doc(usersDataCollection, email);

  // Data to be added to the document
  const userData = {
    First_Name: firstName,
    Last_Name: lastName,
    Display_Name: displayName,
    Email_ID: email,
    Wishlist: {}, // Array of {product_id: string, API_URL: string, count: number}
    Cart: [], // Array of {product_id: string, API_URL: string, count: number}
  };

  // Set the data in the document
  setDoc(userDocRef, userData)
    .then(() => {
      console.log("User data created successfully");
    })
    .catch((error) => {
      console.error("Error creating user data:", error);
    });
}
