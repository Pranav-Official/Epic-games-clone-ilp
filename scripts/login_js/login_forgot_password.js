import { firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const changePassWord = () => {
  if (validateInput()) {
    const email = document.querySelector("#email-field-forgot").value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset mail sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Password reset error: ${errorCode} - ${errorMessage}`);
      });
  }
};

document
  .querySelector("#sendmail-button")
  .addEventListener("click", changePassWord);

const validateInput = () => {
  let emailInput = document.getElementById("email-field-forgot");
  let emailBox = document.querySelector(".email-input-forgot-inner");
  let submitDiv = document.getElementById("send-mail-div");
  let isvalidDiv = document.getElementById("invalid-mail");
  let continueLink = document.getElementById("sendmail-button");

  let isValidEmail = isValidEmailFormat(emailInput.value);
  if (emailInput.value.trim() === "") {
    continueLink.style.cursor = "default";
    emailBox.style.borderColor = "#DE3341";
    submitDiv.classList.remove("sendmail-button");
    isvalidDiv.textContent = "Required";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else if (!isValidEmail) {
    continueLink.style.cursor = "default";
    emailBox.style.borderColor = "#DE3341";
    submitDiv.classList.remove("sendmail-button");
    isvalidDiv.textContent = "Invalid email";
    isvalidDiv.removeAttribute("hidden");
    return false;
  } else {
    console.log("valid");
    continueLink.style.cursor = "pointer";
    emailBox.style.borderColor = "";
    isvalidDiv.setAttribute("hidden", "true");
    submitDiv.classList.add("sendmail-button");
    return true;
  }
};

//funcion to check email format
function isValidEmailFormat(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document
  .getElementById("email-field-forgot")
  .addEventListener("input", validateInput);

//function to animate password field placeholder text
document
  .getElementById("email-field-forgot")
  .addEventListener("focus", function () {
    let placeholderLabel = document.querySelector(".placeholder-label-forgot");
    placeholderLabel.style.top = "30%";
    placeholderLabel.style.fontSize = "12px";
  });

//Function to revert animated password field placeholder text
document
  .getElementById("email-field-forgot")
  .addEventListener("blur", function () {
    var placeholderLabel = document.querySelector(".placeholder-label-forgot");
    // Revert the styles when focus is lost
    if (!this.value) {
      placeholderLabel.style.top = "50%";
      placeholderLabel.style.fontSize = "14px";
    }
  });
