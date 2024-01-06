document.addEventListener("DOMContentLoaded", function () {
  // Get the header element
  var header = document.querySelector(".head-navbar");
  let empty = document.querySelector(".head-navbar2");

  // Get the initial offset of the header
  var headerOffset = header.offsetTop;

  // Set the position fixed when scroll position is past a certain point
  function handleScroll() {
    var scrollPosition = window.scrollY;

    // Adjust this value based on when you want the header to become fixed
    var scrollThreshold = 2;

    if (scrollPosition > headerOffset + scrollThreshold) {
      header.classList.add("fixed-header");
      empty.classList.remove("empty-header");
      document.querySelector(".epic-menu ").classList.remove("active");
      document.querySelector(".epic-menu-arrow").classList.remove("active");
    } else {
      header.classList.remove("fixed-header");
      empty.classList.add("empty-header");
    }
  }

  // Add the scroll event listener
  window.addEventListener("scroll", handleScroll);
});
