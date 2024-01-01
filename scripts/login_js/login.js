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

//Function to check if an email is already registered or not
document
  .getElementById("continue-link")
  .addEventListener("click", function checkMail() {
    let email = document.getElementById("email-field").value;
    sessionStorage.setItem("email", email);
    if (validateInput()) {
      fetchSignInMethodsForEmail(auth, email)
        .then((signInMethods) => {
          if (signInMethods.length === 0) {
            console.log(signInMethods);
            console.log("Email is not registered.");
          } else {
            console.log("Email is already registered.");
            console.log("Sign-in methods:", signInMethods);
            window.location.href = "login_password.html";
          }
        })
        .catch((error) => {
          console.error("Error checking email:", error);
        });
    }
  });

//function to validate email input field
const validateInput = () => {
  let emailInput = document.getElementById("email-field");
  let submitDiv = document.getElementById("continue-div");
  let isvalidDiv = document.getElementById("invalid-mail");
  let continueLink = document.getElementById("continue-link");

  var isValidEmail = isValidEmailFormat(emailInput.value);
  if (emailInput.value.trim() === "") {
    continueLink.style.cursor = "default";
    emailInput.style.borderColor = "#DE3341";
    submitDiv.classList.remove("continue-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else if (!isValidEmail) {
    continueLink.style.cursor = "default";
    emailInput.style.borderColor = "#DE3341";
    submitDiv.classList.remove("continue-button");
    isvalidDiv.textContent = "Invalid email";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    console.log("valid");
    continueLink.style.cursor = "pointer";
    emailInput.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    submitDiv.classList.add("continue-button");
    return true;
  }
};

//funcion to check email format
function isValidEmailFormat(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.getElementById("email-field").addEventListener("input", validateInput);

//funtion to animate inputfield placeholder text
document.getElementById("email-field").addEventListener("input", function () {
  var placeholderLabel = document.querySelector(".placeholder-label");
  placeholderLabel.style.top = this.value ? "20%" : "50%";
  placeholderLabel.style.fontSize = this.value ? "12px" : "14px";
});
