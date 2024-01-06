document.addEventListener("DOMContentLoaded", function () {
  var inputField = document.getElementById("slug");
  var creatorTagLabel = document.getElementById("creatorTagLabel");

  // Add focus event listener
  inputField.addEventListener("focus", function () {
    // Set placeholder to an empty string when the input field is focused
    inputField.placeholder = "";
  });

  // Add blur event listener (optional: to restore the placeholder when the field loses focus)
  inputField.addEventListener("blur", function () {
    // Set placeholder back to its original value when the input field loses focus
    inputField.placeholder = "ENTER A CREATOR TAG";
  });

  // Add input event listener
  inputField.addEventListener("input", function () {
    // Hide the span when there is text in the input field
    creatorTagLabel.style.display = inputField.value ? "none" : "inline";
  });
});
