//function to show the popup box for displayname and  password
function popUp(popid) {
  const popupMessage = document.getElementById(popid);
  // Display the popup at position
  popupMessage.style.display = "block";
}
//function to hide the popup box for displayname and password
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
