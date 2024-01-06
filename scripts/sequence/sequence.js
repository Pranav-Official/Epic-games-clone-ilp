document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");

  function toggleSections() {
    sections.forEach((section) => {
      section.classList.toggle("visible");
    });
  }

  let currentIndex = 0;
  let timeoutId;

  function showNextSection() {
    sections[currentIndex].classList.add("visible");

    if (currentIndex === 2) {
      // If it's the third section, stop the timeout
      clearTimeout(timeoutId);
    } else {
      currentIndex = (currentIndex + 1) % sections.length;
      timeoutId = setTimeout(() => {
        sections.forEach((section) => {
          section.classList.remove("visible");
        });
        showNextSection();
      }, 2000); // Adjust the time interval (in milliseconds) for each section
    }
  }

  // Start the loop
  showNextSection();
});
