function toggleAnswer(button) {
  const collapseSection = button.nextElementSibling;

  // Toggle the visibility of the answer
  if (
    collapseSection.style.display === "none" ||
    collapseSection.style.display === ""
  ) {
    collapseSection.style.display = "block";
    button.setAttribute("aria-expanded", "false");
  } else {
    collapseSection.style.display = "none";
    button.setAttribute("aria-expanded", "true");
  }
}
