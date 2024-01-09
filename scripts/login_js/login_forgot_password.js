import { firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const email = document.querySelector("#email-field-locked").value;

const changePassWord = () => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("password reset mail sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

document
  .querySelector("#sendmail-button")
  .addEventListener("click", changePassWord);

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
