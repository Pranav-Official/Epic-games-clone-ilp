import { firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

//Function to change the email in the locked email field
const updateMailLockedField = () => {
  const email = sessionStorage.getItem("email");
  console.log(email);
  const lockedMail = document.getElementById("email-inputed");
  lockedMail.innerText = email;
};
document.addEventListener("DOMContentLoaded", updateMailLockedField);

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

document
  .getElementById("eye-button")
  .addEventListener("click", togglePasswordVisibility);

//function to signup a new user
function signup() {
  const email = sessionStorage.getItem("email");
  const password = document.getElementById("password-field").value;
  const firstName = document.getElementById("first-name-input").value;
  const lastName = document.getElementById("last-name-input").value;
  const displayName = document.getElementById("display-name-inputed").value;

  //check if the fields and checkbox is valid
  if (
    validateDisplayName() &&
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    areAllFieldsFilled()
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential + "Ussr");
        //not using yet
        const user = userCredential.user;
        // Call the function to create user data in Firestore
        createUserData(email, firstName, lastName, displayName);
        window.alert("Success! Account created");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Error occured! Try Again!");
      });
  }
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
    Wishlist: [],
    Cart: [],
    Trasactions: [],
    EpicRewardpoint: 0,
  };

  // Set the data in the document
  setDoc(userDocRef, userData)
    .then(() => {
      console.log("User data created successfully");
      window.location.href = "../../pages/login_page/login_password.html";
    })
    .catch((error) => {
      console.error("Error creating user data:", error);
    });
}

//checks if all required fields are filled
const areAllFieldsFilled = () => {
  let signUpDiv = document.getElementById("sign-up-div");
  let singUpLink = document.getElementById("signup-button");
  // Get all text input elements on the page
  let inputElements = document.querySelectorAll('input[type="text"]');
  let checkboxElement = document.querySelector("#checkbox-input-required");
  let paswordElement = document.querySelector("#password-field");
  for (let i = 0; i < inputElements.length; i++) {
    let currentElement = inputElements[i];
    if (!currentElement.value.trim()) {
      return false;
    }
  }

  if (checkboxElement.checked) {
    signUpDiv.classList.add("signup-button");
    singUpLink.style.cursor = "pointer";
  } else {
    signUpDiv.classList.remove("signup-button");
    singUpLink.style.cursor = "default";
  }

  //checking the password field before returning true
  if (checkboxElement.checked && paswordElement.value.trim()) {
    return true;
  } else {
    return false;
  }
};

document
  .getElementById("checkbox-input-required")
  .addEventListener("input", areAllFieldsFilled);

//function to validate last name
const validateLastName = () => {
  let LastNameInput = document.getElementById("last-name-input");
  let LastNameBox = document.getElementById("last-name");
  let signUpDiv = document.getElementById("sign-up-div");
  let isvalidDiv = document.getElementById("invalid-lastname-signup");
  let singUpLink = document.getElementById("signup-button");

  if (LastNameInput.value.trim() === "") {
    singUpLink.style.cursor = "default";
    LastNameBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    LastNameBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    if (areAllFieldsFilled()) {
      signUpDiv.classList.add("signup-button");
      singUpLink.style.cursor = "pointer";
    }
    return true;
  }
};

//validate first name
const validateFirstName = () => {
  let FirstNameInput = document.getElementById("first-name-input");
  let FirstNameBox = document.getElementById("first-name");
  let signUpDiv = document.getElementById("sign-up-div");
  let isvalidDiv = document.getElementById("invalid-firstname-signup");
  let singUpLink = document.getElementById("signup-button");

  if (FirstNameInput.value.trim() === "") {
    singUpLink.style.cursor = "default";
    FirstNameBox.style.borderColor = "#DE3341";
    signUpDiv.classList.remove("signup-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    FirstNameBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    if (areAllFieldsFilled()) {
      signUpDiv.classList.add("signup-button");
      singUpLink.style.cursor = "pointer";
    }
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
    DisplayBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    if (areAllFieldsFilled()) {
      signUpDiv.classList.add("signup-button");
      singUpLink.style.cursor = "pointer";
    }
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
    passwordBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    if (areAllFieldsFilled()) {
      signUpDiv.classList.add("signup-button");
      singUpLink.style.cursor = "pointer";
    }

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
  .getElementById("first-name-input")
  .addEventListener("input", validateFirstName);

document
  .getElementById("last-name-input")
  .addEventListener("input", validateLastName);

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

document
  .getElementById("eye-button")
  .addEventListener("click", togglePasswordVisibility);
