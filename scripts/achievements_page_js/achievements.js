import {
  fetchGameAchievements,
  fetchSingleGameData,
} from "../game_info/gameinfo_fetch.js";

//function to show the popup box
function popUp(popid) {
  const popupMessage = document.getElementById(popid);
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
  var computedStyle = window.getComputedStyle(displayNow);
  if (computedStyle.display == "none") {
    console.log("Hello");
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

//Funtion to load the top part of the page (game background ,title number of achievements etc)
const displayGameInfo = async (gameSlug, sortFlag) => {
  let achievementsResultList = await sortAchievements(gameSlug, sortFlag);
  console.log(achievementsResultList);
  let gameData = await fetchSingleGameData(gameSlug);
  document.querySelector(".achievements-game-title").innerHTML = gameData.name;
  document.querySelector(".achievements-game-background").innerHTML = ` <img
              width="940"
              height="530"
              style="border-radius: 4px"
              src="${gameData.background_image}"
              alt=""
            />`;

  document.querySelector(
    "#no-of-achievements"
  ).innerHTML = `${achievementsResultList.length} Achievements`;
  document.querySelector("#xp-achievements").innerHTML = `${
    achievementsResultList.length * 10
  } XP`;
  document.querySelector(
    ".achievement-info-pop"
  ).innerHTML = `Achievements ${achievementsResultList.length}`;
  displayAchievements(achievementsResultList);
};

const displayAchievements = (achievementsResultList) => {
  let achievementsHtml = ``;
  for (let achievement of achievementsResultList) {
    achievementsHtml += `  <div class="achievement-card">
              <div class="achievement-card-inner">
                <div class="achievement-image">
                  <img
                    style="border-radius: 4px"
                    src="${achievement.image}"
                    height="96"
                    width="96"
                    alt=""
                  />
                </div>
                <div class="achievement-details">
                  <div class="achievement-title-description">
                    <div class="achievement-title">${achievement.name}</div>
                    <div class="achievement-description">
                     ${achievement.description}
                    </div>
                  </div>
                  <div class="achievement-xp-rarity">
                    <div class="xp">
                      <span class="xpspan">10&nbspXP</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="14"
                        style="color: rgb(202, 81, 43)"
                        fill="currentColor"
                        class="bi bi-trophy-fill"
                        viewBox="0 0 16 9"
                      >
                        <path
                          d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"
                        />
                      </svg>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="rarity">${achievement.percent}% of players unlock</div>
                  </div>
                </div>
              </div>
              <div class="line-div-achievement-card"></div>
            </div>`;
  }
  document.querySelector(".achievement-cards-whole").innerHTML =
    achievementsHtml;
};

const sortAchievements = async (gameSlug, sortFlag) => {
  let achievementsResultList = [];
  let achievementData;
  let pageNumber = 1;
  do {
    achievementData = await fetchGameAchievements(gameSlug, pageNumber);
    for (let achievement of achievementData.results) {
      achievementsResultList.push(achievement);
    }
    pageNumber++;
  } while (achievementData.next != null);
  if (sortFlag == true) {
    achievementsResultList.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  return achievementsResultList;
};

window.onload = displayGameInfo("forza-horizon", true);
