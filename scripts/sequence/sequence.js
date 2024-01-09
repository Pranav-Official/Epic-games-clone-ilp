import { placeOrder } from "../_functions/buy_single_game.js";

document.getElementById("cardNum").addEventListener("input", function (event) {
  const input = event.target;
  const inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  const formattedValue = formatCardNumber(inputValue);
  input.value = formattedValue;
});

document.getElementById("cardNum").addEventListener("input", function (event) {
  const input = event.target;
  const inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  const formattedValue = formatCardNumber(inputValue);
  input.value = formattedValue;
});

document.getElementById("expiry").addEventListener("input", function (event) {
  const input = event.target;
  const inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  const formattedValue = formatExpiry(inputValue);
  input.value = formattedValue;
});

function formatCardNumber(value) {
  const groups = value.match(/(\d{1,4})/g) || [];
  return groups.join("-");
}

function formatExpiry(value) {
  if (value.length <= 2) {
    // Format as "mm"
    return value;
  } else {
    // Format as "mm/yy"
    const month = Math.min(parseInt(value.slice(0, 2), 10), 12); // Ensure month is between 1 and 12
    return month.toString().padStart(2, "0") + "/" + value.slice(2, 4);
  }
}

// document.getElementById("placeOrderButton").disabled = true;

document.getElementById("placeOrderButton").addEventListener("click", () => {
  const result = placeOrder();
  if (result == true) {
    window.location.href = "../../pages/gameinfo.html";
  } else {
    window.location.href = "../../pages/gameinfo.html";
  }
});
