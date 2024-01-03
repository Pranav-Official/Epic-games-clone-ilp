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

//function to signup a new user
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

//function to animate placeholder text
function onFocusAnimation(divInQuestion) {
  let placeholderLabel = document.querySelector(divInQuestion);
  placeholderLabel.style.top = "30%";
  placeholderLabel.style.fontSize = "12px";
}

//Function to revert animated placeholder text
function onBlurAnimation(divInQuestion, inputField) {
  let placeholderLabel = document.querySelector(divInQuestion);
  // Revert the styles when focus is lost and no value in field
  let inputVal = document.getElementById(inputField).value;
  if (!inputVal) {
    placeholderLabel.style.top = "50%";
    placeholderLabel.style.fontSize = "14px";
  }
}

//function to show the popup box for displayname and  password
function popUp(popid) {
  const popupMessage = document.getElementById(popid);
  // Display the popup at position
  popupMessage.style.display = "block";
  popupMessage.style.top = 3 + "rem";
  popupMessage.style.left = 10 + "rem";
}
//function to hide the popup box for displayname and password
function noPopUp(popid) {
  const popupMessage = document.getElementById(popid);
  popupMessage.style.display = "none";
}

//validate first name
const validateFirstName = () => {
  let FirstNameInput = document.getElementById("first-name-input");
  let DisplayBox = document.getElementById("first-name");
  let signUpDiv = document.getElementById("sign-up-div");
  let isvalidDiv = document.getElementById("invalid-display");
  let singUpLink = document.getElementById("signup-button");

  if (displayNameInput.value.trim() === "") {
    singUpLink.style.cursor = "default";
    DisplayBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else if (!isValidDisplayNameFormat(displayNameInput.value)) {
    singUpLink.style.cursor = "default";
    DisplayBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Wrong format";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    console.log("valid");
    DisplayBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    // signInDiv.classList.add("signing-button");
    return true;
  }
};

//function to validate displayname
const validateDisplayName = () => {
  let displayNameInput = document.getElementById("display-name-inputed");
  let DisplayBox = document.getElementById("display-name-id");
  let signUpDiv = document.getElementById("sign-up-div");
  let isvalidDiv = document.getElementById("invalid-display");
  let singUpLink = document.getElementById("signup-button");

  if (displayNameInput.value.trim() === "") {
    singUpLink.style.cursor = "default";
    DisplayBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else if (!isValidDisplayNameFormat(displayNameInput.value)) {
    singUpLink.style.cursor = "default";
    DisplayBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Wrong format";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    console.log("valid");
    DisplayBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    // signInDiv.classList.add("signing-button");
    return true;
  }
};

//funcion to validate password
const validatePassword = () => {
  let passwordInput = document.getElementById("password-field");
  let passwordBox = document.getElementById("password-box-id");
  let signUpDiv = document.getElementById("sign-up-div");
  let isvalidDiv = document.getElementById("invalid-password");
  let singUpLink = document.getElementById("signup-button");

  if (passwordInput.value.trim() === "") {
    singUpLink.style.cursor = "default";
    passwordBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else if (!isValidPasswordFormat(passwordInput.value)) {
    singUpLink.style.cursor = "default";
    passwordBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Wrong format";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    console.log("valid");
    passwordBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    // signInDiv.classList.add("signing-button");
    return true;
  }
};

function isValidPasswordFormat(password) {
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=\S+$).{7,}$/;
  return passwordRegex.test(password);
}
function isValidDisplayNameFormat(name) {
  let DisplayNameRegex =
    /^[a-zA-Z0-9](?!.*?[._-]{2})[a-zA-Z0-9._-]{2,15}[a-zA-Z0-9]$/;
  return DisplayNameRegex.test(name);
}

document
  .getElementById("password-field")
  .addEventListener("input", validatePassword);

document
  .getElementById("display-name-inputed")
  .addEventListener("input", validateDisplayName);

document
  .getElementById("toggle-displayname-info")
  .addEventListener("mouseover", () => {
    popUp("popupMessage");
  });

document
  .getElementById("toggle-displayname-info")
  .addEventListener("mouseout", () => {
    noPopUp("popupMessage");
  });

document
  .getElementById("toggle-password-info")
  .addEventListener("mouseover", () => {
    popUp("popupMessage2");
  });

document
  .getElementById("toggle-password-info")
  .addEventListener("mouseout", () => {
    noPopUp("popupMessage2");
  });

document
  .getElementById("password-field")
  .addEventListener("focus", function () {
    onFocusAnimation(".password-placeholder-label", "password-field");
  });
document.getElementById("password-field").addEventListener("blur", function () {
  onBlurAnimation(".password-placeholder-label", "password-field");
});

document
  .getElementById("first-name-input")
  .addEventListener("focus", function () {
    onFocusAnimation("#first-name-label", "first-name-input");
  });
document
  .getElementById("first-name-input")
  .addEventListener("blur", function () {
    onBlurAnimation("#first-name-label", "first-name-input");
  });

document
  .getElementById("last-name-input")
  .addEventListener("focus", function () {
    onFocusAnimation("#last-name-label", "last-name-input");
  });
document
  .getElementById("last-name-input")
  .addEventListener("blur", function () {
    onBlurAnimation("#last-name-label", "last-name-input");
  });

document
  .getElementById("display-name-inputed")
  .addEventListener("focus", function () {
    onFocusAnimation("#displayname-label", "display-name-inputed");
  });
document
  .getElementById("display-name-inputed")
  .addEventListener("blur", function () {
    onBlurAnimation("#displayname-label", "display-name-inputed");
  });
