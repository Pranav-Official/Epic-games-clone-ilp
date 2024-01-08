document.addEventListener("DOMContentLoaded", function () {
  var inputFieldSlug = document.getElementById("slug");
  var inputFieldCardNum = document.getElementById("cardNum");
  var inputFieldExpiry = document.getElementById("expiry");
  var inputFieldCvv = document.getElementById("cvv");

  var cardNumberLabel = document.getElementById("cardNumberLabel");
  var creatorTagLabel = document.getElementById("creatorTagLabel");
  var expiryLabel = document.getElementById("expiryLabel");
  var cvvLabel = document.getElementById("cvvLabel");

  function setPlaceholderOnFocus(inputField, placeholder) {
    inputField.addEventListener("focus", function () {
      inputField.placeholder = "";
    });

    inputField.addEventListener("blur", function () {
      inputField.placeholder = placeholder;
    });
  }

  function hideLabelOnInput(inputField, label) {
    inputField.addEventListener("input", function () {
      label.style.display = inputField.value ? "none" : "inline";
    });
  }

  setPlaceholderOnFocus(inputFieldSlug, "ENTER A CREATOR TAG");
  hideLabelOnInput(inputFieldSlug, creatorTagLabel);

  setPlaceholderOnFocus(inputFieldCardNum, "ENTER CARD NUMBER");
  hideLabelOnInput(inputFieldCardNum, cardNumberLabel);

  setPlaceholderOnFocus(inputFieldExpiry, "ENTER EXPIRY DATE");
  hideLabelOnInput(inputFieldExpiry, expiryLabel);

  setPlaceholderOnFocus(inputFieldCvv, "ENTER CVV");
  hideLabelOnInput(inputFieldCvv, cvvLabel);
});
