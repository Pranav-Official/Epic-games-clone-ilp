document.addEventListener("DOMContentLoaded", function () {
  // Use the correct classes for the checkboxes and forms
  var checkbox1 = document.querySelector(".payment-radio__input");
  var checkbox2 = document.querySelector(".payment-radio__input2");
  var paymentForm1 = document.querySelector(".payment-method__form");
  var paymentForm2 = document.querySelector(".payment-method__form2");

  // Initially hide the second form
  paymentForm2.style.display = "none";

  // Add change event listener to the first checkbox
  checkbox1.addEventListener("change", function () {
    // Check if the first checkbox is checked
    if (checkbox1.checked) {
      // Show the first form
      paymentForm1.style.display = "block";

      // Hide the second form
      paymentForm2.style.display = "none";

      // Uncheck the second checkbox
      checkbox2.checked = false;
    } else {
      // Hide the first form if the first checkbox is unchecked
      paymentForm1.style.display = "none";
    }
  });

  // Add change event listener to the second checkbox
  checkbox2.addEventListener("change", function () {
    // Check if the second checkbox is checked
    if (checkbox2.checked) {
      // Show the second form
      paymentForm2.style.display = "block";

      // Hide the first form
      paymentForm1.style.display = "none";

      // Uncheck the first checkbox
      checkbox1.checked = false;
    } else {
      // Hide the second form if the second checkbox is unchecked
      paymentForm2.style.display = "none";
    }
  });
});
