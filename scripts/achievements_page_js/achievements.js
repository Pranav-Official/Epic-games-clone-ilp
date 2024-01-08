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
  .querySelector(".achievement-info-pop")
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
    // console.log("Hello");
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
const displayGameInfo = async (sortFlag) => {
  const gameSlug = localStorage.getItem("gameSlug-info");
  console.log(gameSlug);
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
  ).innerHTML = `Achievements (${achievementsResultList.length})<a class="achievement-info-pop-link"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-exclamation-circle-fill"
                    viewBox="0 -4  20  20  "
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
                    /></svg
                ></a> `;
  displayAchievements(achievementsResultList);
};

//to display achievements
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

  let achivementCardDiv = document.querySelector(".achievement-cards-whole");
  achivementCardDiv.innerHTML = achievementsHtml;
  let height = achivementCardDiv.offsetHeight;
  console.log(height);
  document.querySelector(".achievements-whole-div").style.height = `${
    height + 950
  }px`;
  document.querySelector(
    ".achievements-footer"
  ).innerHTML = ` <div class="footer-main-container">
      <div class="egf-theme epic_games">
        <footer id="egf" class="egf container-fluid bg-color mobile-border-color epic_games egf-footer">
          <div>
            <div class="row footer-social-container">
             <div class="col-xs-10 col-sm-8" data-component="Social">
              <ul class="social">
                <li data-component="Social">
                  <a id="facebook" class="focus" aria-label="Follow Us on Facebook" href="" data-index="0" target="_blank" rel="noopener noreferrer">
                    <div data-component="Icon">
                      <i class="text-color-nonactive accent-color-hover egf-footer-icon bi bi-facebook">
                        &nbsp;
                      </i>
                    </div>
                  </a>
                </li>
                <li data-component="Social">
                  <a id=twitter" class="focus" aria-label="Follow Us on Twitter" href="" data-index="1" target="_blank" rel="noopener noreferrer">
                    <div data-component="Icon">
                      <i class="text-color-nonactive accent-color-hover egf-footer-icon bi bi-twitter">
                        &nbsp;
                      </i>
                    </div>
                  </a>
                </li> 
                <li data-component="Social">
                  <a id=youtube" class="focus" aria-label="Follow Us on Youtube" href="" data-index="2" target="_blank" rel="noopener noreferrer">
                    <div data-component="Icon">
                      <i class="text-color-nonactive accent-color-hover egf-footer-icon bi bi-youtube"">
                        &nbsp;
                      </i>
                    </div>
                  </a>
                </li>                
              </ul>
             </div>
             <div class="col-xs-2 col-sm-4 pull-right" data-component="UpButton">
              <button aria-label="Return to Top" class="focus up-button text-color-nonactive-border accent-color-hover-border ">
                <i class="bi bi-chevron-up text-color-nonactive accent-color-hover"></i>
              </button>
             </div>
            </div>
            <div class="row footer-link-container">
            <div class="col xs-12 col-sm-8 col-md-7 col-lg-6">
              <div class="footer-link-wrapper" data-component="footerlink">
                <div class="inner-heading-wrapper">
                  <div class="subtitle text-color mobile-border-color">
                    <span>Resources</span>
                  </div>
                  <ul class="footer-links first-column">
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/affiliate/en-US/overview" data-index="0" class="focus text-color accent-color-hover " target="" rel="noopener noreferrer">Support-A-Creator</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="/en-US/about" data-index="1" class="focus text-color accent-color-hover " rel="">Distribute on Epic Games</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/site/careers" data-index="2" class="focus text-color accent-color-hover " rel="noopener noreferrer">Careers</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/site/about" data-index="3" class="focus text-color accent-color-hover " rel="noopener noreferrer">Company</a>
                    </li>
                  </ul>
                  <ul class="footer-links second-column">
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/site/fan-art-policy" data-index="4" class="focus text-color accent-color-hover " rel="noopener noreferrer">Fan Art Policy</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/site/ux" data-index="5" class="focus text-color accent-color-hover " rel="noopener noreferrer">UX Research</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="/en-US/eula" data-index="6" class="focus text-color accent-color-hover " rel="">Store EULA</a>
                    </li>
                  </ul>
                  <ul class="footer-links third-column">
                    <li data-component="footerlinks">
                      <a href="https://dev.epicgames.com" data-index="7" class="focus text-color accent-color-hover " rel="noopener noreferrer">Online Services</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/site/community-rules" data-index="8" class="focus text-color accent-color-hover " rel="noopener noreferrer">Community Rules</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/site/news" data-index="9" class="focus text-color accent-color-hover " rel="noopener noreferrer">Epic Newsroom</a>
                    </li>
                  </ul>                  
                </div>
              </div>              
            </div>
            </div>
            <div class="row footer-link-container">
            <div class="col xs-12 col-sm-8 col-md-7 col-lg-6">
              <div class="footer-link-wrapper" data-component="footerlink">
                <div class="inner-heading-wrapper">
                  <div class="subtitle text-color mobile-border-color">
                    <span>Made by Epic Games</span>
                  </div>
                  <ul class="footer-links first-column">
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/battlebreakers" data-index="0" class="focus text-color accent-color-hover " rel="noopener noreferrer">Battle Breakers</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/fortnite" data-index="1" class="focus text-color accent-color-hover " rel="noopener noreferrer">Fortnite</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/infinityblade" data-index="2" class="focus text-color accent-color-hover " rel="noopener noreferrer">Infinity Blade</a>
                    </li>
                  </ul>
                  <ul class="footer-links second-column">
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/roborecall" data-index="3" class="focus text-color accent-color-hover " rel="noopener noreferrer">Robo Recall</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/shadowcomplex" data-index="4" class="focus text-color accent-color-hover " rel="noopener noreferrer">Shadow Complex</a>
                    </li>
                    <li data-component="footerlinks">
                      <a href="https://www.epicgames.com/unrealtournament" data-index="5" class="focus text-color accent-color-hover " rel="noopener noreferrer">Unreal Tournament</a>
                    </li>
                  </ul>                  
                </div>
              </div>              
            </div>            
            </div>
          </div>          
          <hr class="mobile-border-color">
          <div class="row copyright">
            <div class="col-xs-12 col-md-12 col-lg-6 no-padding" data-component="Copyright">
              <div class="copyright-paragraph">
                <span class="text-color-nonactive" data-component="Copyright">
                  © 2023, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners. 
                  &nbsp;&nbsp;
                </span>
              </div>
            </div>
          </div>
          <div class="row footer-legal">
            <div class="col-xs-12 col-sm-6 legal" data-component="Legal">
              <ul class="links">
                <li class="legal-links" data-component="legal">
                  <a class="focus text-color accent-color-hover" data-index="0" rel="noopener noreferrer" href="https://www.epicgames.com/site/en-US/tos">Terms of Service</a>
                </li>
                <li class="legal-links" data-component="legal">
                 <a class="focusable text-color accent-color-hover" data-index="1" rel="noopener noreferrer" href="https://www.epicgames.com/site/en-US/privacypolicy">Privacy Policy</a>
                </li>
                <li class="legal-links" data-component="legal">
                  <a class="focusable text-color accent-color-hover" data-index="2" rel="noopener noreferrer" href="https://www.epicgames.com/site/en-US/store-refund-policy">Store Refund Policy</a>
                </li>
              </ul>
            </div>
            <div class="col-xs-12 col-sm-6 legal" data-component="Legal">
              <ul class="logos">
                <li data-component="legal">
                  <a class="focusable" href="https://www.epicgames.com" title="Epic Games" target="_blank" rel="noopener noreferrer">
                    <i title="Epic Games" class="text-color-nonactive eg-footer-icon-eg"></i>
                  </a>
                </li>
              </ul>

            </div>            
          </div>          
        </footer>        
      </div>
    </div>`;
};

//function to sort achievements according to name
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
  if (sortFlag == false) {
    displayAchievements(achievementsResultList);
  }
  return achievementsResultList;
};

document.querySelector(".sort-rarity").addEventListener("click", () => {
  const gameSlug = localStorage.getItem("gameSlug-info");
  document.querySelector(".sort-dropdown").innerHTML = `Rarity
                <svg
                  id="arrow-down"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 18 5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>`;
  noPopUp("sorting-drop-up-list-id");
  document.querySelector(".sort-rarity").style.color = "#FFFFFF";
  document.querySelector(".sort-alphabet").style.color = "#9a9a9a";
  sortAchievements(gameSlug, false);
});

document.querySelector(".sort-alphabet").addEventListener("click", async () => {
  const gameSlug = localStorage.getItem("gameSlug-info");
  document.querySelector(".sort-dropdown").innerHTML = `Alphabetical
                <svg
                  id="arrow-down"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 18 5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>`;
  noPopUp("sorting-drop-up-list-id");
  document.querySelector(".sort-rarity").style.color = " #9a9a9a";
  document.querySelector(".sort-alphabet").style.color = "#FFFFFF";
  let resultList = await sortAchievements(gameSlug, true);
  displayAchievements(resultList);
});

window.onload = displayGameInfo(true);
