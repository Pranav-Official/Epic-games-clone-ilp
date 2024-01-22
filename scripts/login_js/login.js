import { firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
            window.location.href = "../signup_page/signup.html";
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
//more change
//change veno
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
