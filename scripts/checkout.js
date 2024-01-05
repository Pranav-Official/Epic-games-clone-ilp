document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the radio button
  var radioButton = document.querySelector(".payment-radio__input");
  radioButton.addEventListener("change", togglePaymentForm);
});

function togglePaymentForm() {
  var paymentForm = document.querySelector(".payment-method__form");
  paymentForm.style.display =
    paymentForm.style.display === "none" || paymentForm.style.display === ""
      ? "block"
      : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the radio button
  var radioButton = document.querySelector(".payment-radio__input");
  radioButton.addEventListener("change", togglePaymentForm);
});

function togglePaymentForm2() {
  var paymentForm = document.querySelector(".payment-method__form2");
  paymentForm.style.display =
    paymentForm.style.display === "none" || paymentForm.style.display === ""
      ? "block"
      : "none";
}
