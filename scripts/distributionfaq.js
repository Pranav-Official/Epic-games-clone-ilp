function toggleAnswer(button) {
  const collapseSection = button.nextElementSibling;
  const svgSpan = button.querySelector(".faq-maxmin-icons");

  // Toggle the visibility of the answer
  if (
    collapseSection.style.display === "none" ||
    collapseSection.style.display === ""
  ) {
    collapseSection.style.display = "block";
    button.setAttribute("aria-expanded", "true");
    // Change the SVG to a white dash when the section is expanded
    svgSpan.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon-pack" viewBox="0 0 12 12" width="12" height="12">
                        <path d="M2 6h8" stroke="white" fill="white"></path>
                    </svg>
                `;
  } else {
    collapseSection.style.display = "none";
    button.setAttribute("aria-expanded", "false");
    // Change the SVG back to a white plus sign when the section is collapsed
    svgSpan.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon-pack" viewBox="0 0 12 12" width="12" height="12">
                        <path d="M6.91667 1.41667C6.91667 0.910406 6.50626 0.5 6 0.5C5.49374 0.5 5.08333 0.910406 5.08333 1.41667V5.08333H1.41667C0.910406 5.08333 0.5 5.49374 0.5 6C0.5 6.50626 0.910406 6.91667 1.41667 6.91667H5.08333V10.5833C5.08333 11.0896 5.49374 11.5 6 11.5C6.50626 11.5 6.91667 11.0896 6.91667 10.5833V6.91667H10.5833C11.0896 6.91667 11.5 6.50626 11.5 6C11.5 5.49374 11.0896 5.08333 10.5833 5.08333H6.91667V1.41667Z" stroke="white" fill="white"></path>
                    </svg>
                `;
  }
}

// Add a click event listener to handle the button click
document.querySelectorAll(".faq-section-button").forEach((button) => {
  button.addEventListener("click", function () {
    toggleAnswer(this);
  });
});
