//function to show the popup box
function popUp(popid) {
  const popupMessage = document.getElementById(popid);
  // Display the popup at position
  popupMessage.style.display = "block";
}
//function to hide the popup box
function noPopUp(popid) {
  const popupMessage = document.getElementById(popid);
  popupMessage.style.display = "none";
}

document
  .querySelector(".achievement-info-pop-link")
  .addEventListener("mouseover", () => {
    popUp("popupMessage");
  });

document
  .querySelector(".achievement-info-pop")
  .addEventListener("mouseout", () => {
    noPopUp("popupMessage");
  });

// sorting dropdown
document.querySelector(".sort-dropdown-link").addEventListener("click", () => {
  const displayNow = document.querySelector("#sorting-drop-up-list-id");

  if (displayNow.style.display == "none") {
    console.log("Hello")
    rotateSVG();
    popUp("sorting-drop-up-list-id");
  } else {
    rotateSVG();
    noPopUp("sorting-drop-up-list-id");
  }
});

// function to rotate svg icon
function rotateSVG() {
  var svgElement = document.getElementById("arrow-down");
  var currentRotation = window.getComputedStyle(svgElement).transform;

  // Toggle rotation between 0 degrees and 45 degrees
  svgElement.style.transform =
    currentRotation === "none" ? "rotate(180deg)" : "none";
}
