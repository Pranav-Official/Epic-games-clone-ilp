"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
// Function to toggle visibility of the password field
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password-field");
    const toggleIcon = document.getElementById("eye-button");
    if (passwordInput && toggleIcon) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.innerHTML =
                '<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/> <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>';
        }
        else {
            passwordInput.type = "password";
            toggleIcon.innerHTML =
                '<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/> <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>';
        }
    }
}
(_a = document
    .getElementById("eye-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", togglePasswordVisibility);
// Function to animate placeholder text
function onFocusAnimation(divInQuestion) {
    const placeholderLabel = document.querySelector(divInQuestion);
    if (placeholderLabel) {
        placeholderLabel.style.top = "30%";
        placeholderLabel.style.fontSize = "12px";
    }
}
// Function to revert animated placeholder text
function onBlurAnimation(divInQuestion, inputField) {
    const placeholderLabel = document.querySelector(divInQuestion);
    if (placeholderLabel) {
        // Revert the styles when focus is lost and no value in field
        const inputVal = document.getElementById(inputField)
            .value;
        if (!inputVal) {
            placeholderLabel.style.top = "50%";
            placeholderLabel.style.fontSize = "14px";
        }
    }
}
// Function to show the popup box for displayname and password
function popUp(popid) {
    const popupMessage = document.getElementById(popid);
    // Display the popup at position
    if (popupMessage) {
        popupMessage.style.display = "block";
        popupMessage.style.top = "3rem";
        popupMessage.style.left = "10rem";
    }
}
// Function to hide the popup box for displayname and password
function noPopUp(popid) {
    const popupMessage = document.getElementById(popid);
    if (popupMessage) {
        popupMessage.style.display = "none";
    }
}
// Add event listeners for mouseover and mouseout on displayname and password
(_b = document
    .getElementById("toggle-displayname-info")) === null || _b === void 0 ? void 0 : _b.addEventListener("mouseover", () => {
    popUp("popupMessage");
});
(_c = document
    .getElementById("toggle-displayname-info")) === null || _c === void 0 ? void 0 : _c.addEventListener("mouseout", () => {
    noPopUp("popupMessage");
});
(_d = document
    .getElementById("toggle-password-info")) === null || _d === void 0 ? void 0 : _d.addEventListener("mouseover", () => {
    popUp("popupMessage2");
});
(_e = document
    .getElementById("toggle-password-info")) === null || _e === void 0 ? void 0 : _e.addEventListener("mouseout", () => {
    noPopUp("popupMessage2");
});
// Add event listeners for focus and blur on password field
(_f = document.getElementById("password-field")) === null || _f === void 0 ? void 0 : _f.addEventListener("focus", () => {
    onFocusAnimation(".password-placeholder-label");
});
(_g = document.getElementById("password-field")) === null || _g === void 0 ? void 0 : _g.addEventListener("blur", () => {
    onBlurAnimation(".password-placeholder-label", "password-field");
});
// Add event listeners for focus and blur on first name field
(_h = document.getElementById("first-name-input")) === null || _h === void 0 ? void 0 : _h.addEventListener("focus", () => {
    onFocusAnimation("#first-name-label");
});
(_j = document.getElementById("first-name-input")) === null || _j === void 0 ? void 0 : _j.addEventListener("blur", () => {
    onBlurAnimation("#first-name-label", "first-name-input");
});
// Add event listeners for focus and blur on last name field
(_k = document.getElementById("last-name-input")) === null || _k === void 0 ? void 0 : _k.addEventListener("focus", () => {
    onFocusAnimation("#last-name-label");
});
(_l = document.getElementById("last-name-input")) === null || _l === void 0 ? void 0 : _l.addEventListener("blur", () => {
    onBlurAnimation("#last-name-label", "last-name-input");
});
// Add event listeners for focus and blur on display name field
(_m = document
    .getElementById("display-name-inputed")) === null || _m === void 0 ? void 0 : _m.addEventListener("focus", () => {
    onFocusAnimation("#displayname-label");
});
(_o = document
    .getElementById("display-name-inputed")) === null || _o === void 0 ? void 0 : _o.addEventListener("blur", () => {
    onBlurAnimation("#displayname-label", "display-name-inputed");
});
