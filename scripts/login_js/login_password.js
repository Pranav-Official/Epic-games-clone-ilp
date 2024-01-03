import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
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
  let email = sessionStorage.getItem("email");
  let lockedMail = document.getElementById("email-inputed");
  console.log(email);
  lockedMail.innerText = email;
};
document.addEventListener("DOMContentLoaded", updateMailLockedField);

//function to signin
function signIn() {
  const email = sessionStorage.getItem("email");
  const password = document.getElementById("password-field").value;
  console.log(password);

  // Sign in with email and password
  if (validateInput()) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in as:", user.email);
        window.location.href = "login_fail.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Sign-in error (${errorCode}): ${errorMessage}`);
        window.location.href = "login_fail.html";
      });
  }
}

//function to toggle vissibility of Password field
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password-field");
  var toggleIcon = document.getElementById("eye-button");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.innerHTML =
      '<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/> <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>';
  } else {
    passwordInput.type = "password";
    toggleIcon.innerHTML =
      '<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/> <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>';
  }
}

//function to animate password field placeholder text
document
  .getElementById("password-field")
  .addEventListener("focus", function () {
    var placeholderLabel = document.querySelector(
      ".password-placeholder-label"
    );
    placeholderLabel.style.top = "30%";
    placeholderLabel.style.fontSize = "12px";
  });
  

//Function to revert animated password field placeholder text
document.getElementById("password-field").addEventListener("blur", function () {
  var placeholderLabel = document.querySelector(".password-placeholder-label");
  // Revert the styles when focus is lost
  if (!this.value) {
    placeholderLabel.style.top = "50%";
    placeholderLabel.style.fontSize = "14px";
  }
});

//funcion to validate input
const validateInput = () => {
  let passwordInput = document.getElementById("password-field");
  let passwordBox = document.getElementById("password-box-id");
  let signInDiv = document.getElementById("sign-in-div");
  let isvalidDiv = document.getElementById("invalid-password");
  let singInLink = document.getElementById("signin-button");

  if (passwordInput.value.trim() === "") {
    singInLink.style.cursor = "default";
    passwordBox.style.borderColor = "#DE3341";
    signInDiv.classList.remove("signing-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    console.log("valid");
    singInLink.style.cursor = "pointer";
    passwordBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    signInDiv.classList.add("signing-button");
    return true;
  }
};

document
  .getElementById("toggle-visibility-button")
  .addEventListener("click", togglePasswordVisibility);

document.getElementById("signin-button").addEventListener("click", signIn);

document
  .getElementById("password-field")
  .addEventListener("input", validateInput);
