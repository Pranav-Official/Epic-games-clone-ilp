function closeModalCheckout() {}
document.addEventListener("DOMContentLoaded", function () {
  const modalContainer = document.querySelector(".modal-container-checkout");
  if (!modalContainer) {
    console.error("Modal container not found in the HTML");
    return;
  }
  function openModal() {
    modalContainer.style.display = "block";
  }
  function closeModalCheckout() {
    modalContainer.style.display = "none";
    console.log("Button is working");
  }
  openModal();
});
