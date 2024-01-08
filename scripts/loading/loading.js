document.addEventListener("DOMContentLoaded", function () {
  const modalContainer = document.getElementById("modalContainer");
  const closeButton = document.getElementById("closeButton");

  // Function to open the modal
  function openModal() {
    modalContainer.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    modalContainer.style.display = "none";
  }

  // Call openModal() to show the modal initially (you can trigger this based on an event)
  openModal();

  // Attach event listener to the close button
  closeButton.addEventListener("click", closeModal);
});
