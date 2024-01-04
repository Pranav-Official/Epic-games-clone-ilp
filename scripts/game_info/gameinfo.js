import fetchSingleGameData from "../game_info/gameinfo_fetch.js";
import { fetchGameScreenShots } from "../game_info/gameinfo_fetch.js";

//function to dynamically load page details
const displayPage = async () => {
  try {
    const gameData = await fetchSingleGameData();
    const screenshots = await fetchGameScreenShots();
    const truncatedDescription = gameData.description.split(/<\/p>/)[0];

    let screenshothtml = ``;
    console.log(gameData);
    console.log(screenshots);
    screenshothtml = ` <div class="swiper-slide">
                  <img
                
                    height="330"
                    width="650"
                    src="${gameData.background_image}"
                    alt=""
                  />
                </div>`;
    swiper.appendSlide(screenshothtml);
    console.log(screenshothtml);
    document.querySelector("#game-main-title").innerHTML = gameData.name;
    document.querySelector(".gametext").innerHTML = gameData.description;
    document.querySelector(".game-big-description").innerHTML =
      truncatedDescription;
    //screenshots
    for (let i = 0; i < screenshots.count; i++) {
      console.log(i);
      screenshothtml = `<div class="swiper-slide"><img
                    height="330"
                    width="650"
                    src="${screenshots.results[i].image}"
                    alt=""
                  /></div>`;

      swiper.appendSlide(screenshothtml);
    }
    // console.log(screenshothtml);
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
};

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1, // Number of slides per view
  spaceBetween: 15, // Space between slides
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

function expandDiv() {
  let flag = true;
  const expandableDiv = document.getElementById("big-game-description");
  // Set the height to auto to show all content
  if (flag) {
    expandableDiv.style.height = "auto";
    flag = false;
  } else {
    expandableDiv.style.height = "7rem";
    flag = true;
  }
}

document.getElementById("show-more-link").addEventListener("click", expandDiv);

displayPage();
