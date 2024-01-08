// Function definition
function closeModalCheckout() {
  // Function logic
  // ...
}

// Event listener
document.addEventListener("DOMContentLoaded", function () {
  const modalContainer = document.querySelector(".modal-container-checkout");

  if (!modalContainer) {
    console.error("Modal container not found in the HTML");
    return;
  }

  // Function to open the modal
  function openModal() {
    modalContainer.style.display = "block";
  }

  // Function to close the modal
  function closeModalCheckout() {
    modalContainer.style.display = "none";
    console.log("Button is working");
  }

  // Call openModal() to show the modal initially (you can trigger this based on an event)
  openModal();
});
