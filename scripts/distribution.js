document.addEventListener("DOMContentLoaded", function () {
  function toggleIcon(button) {
    // Toggle the 'expanded' class on the button
    button.classList.toggle("expanded");

    // Find the icon element within the button
    var icon = button.querySelector(".faq-maxmin-icons svg");

    // Toggle the 'plus-icon' and 'minus-icon' classes on the icon
    icon.classList.toggle("plus-icon");
    icon.classList.toggle("minus-icon");

    // Toggle the 'aria-expanded' attribute on the button
    var isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
  }

  // Attach the toggleIcon function to the button click event
  var buttons = document.querySelectorAll(".faq-section-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleIcon(this);
    });
  });
});
