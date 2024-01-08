document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const placeOrderButton = document.getElementById("placeOrderButton");

  function toggleSections(currentIndex) {
    sections.forEach((section, index) => {
      section.classList.toggle("visible", index === currentIndex);
    });
  }

  let currentIndex = 0;
  let intervalId;

  function showNextSection() {
    toggleSections(currentIndex);

    if (currentIndex === 2) {
      clearInterval(intervalId);
    }

    currentIndex = (currentIndex + 1) % sections.length;
  }

  function handleButtonClick() {
    showNextSection();

    if (!intervalId && currentIndex !== sections.length) {
      intervalId = setInterval(() => {
        showNextSection();
      }, 2000);
    }
  }

  placeOrderButton.addEventListener("click", handleButtonClick);

  intervalId = setInterval(() => {
    showNextSection();
  }, 2000);
});

// Function to toggle the "Place Order" button state
function togglePlaceOrderButton() {
  const checkbox1 = document.querySelector(".payment-radio__input2");
  const checkbox2 = document.querySelector(".payment-radio__input");
  const checkbox3 = document.querySelector(".payment-check-box__input");
  const placeOrderButton = document.getElementById("placeOrderButton");

  if ((checkbox1.checked || checkbox2.checked) && checkbox3.checked) {
    placeOrderButton.disabled = false;
  } else {
    placeOrderButton.disabled = true;
  }
}

// Function to handle the click event for checkbox1
function togglePaymentForm2() {
  togglePlaceOrderButton();
}

// Function to handle the change event for checkbox2
function togglePaymentForm() {
  togglePlaceOrderButton();
}

// Function to handle the change event for checkbox3
function toggleCheckBox3() {
  togglePlaceOrderButton();
}
