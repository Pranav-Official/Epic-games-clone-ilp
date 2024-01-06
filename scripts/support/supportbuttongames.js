document.addEventListener("DOMContentLoaded", () => {
  const gamesList = document.getElementById("gamesList");
  const showAllButton = document.getElementById("showAllButton");

  showAllButton.addEventListener("click", () => {
    fetch("https://mocki.io/v1/3141cac6-b85a-41af-91d4-eecbf3e7bed1")
      .then((response) => response.json())
      .then((games) => {
        gamesList.innerHTML = ""; // Clear existing content

        games.forEach((game) => {
          const listItem = document.createElement("li");
          listItem.classList.add("GamesSectionList__item");

          const anchor = document.createElement("a");
          anchor.classList.add("GamesSectionTile__wrapper");
          anchor.setAttribute("aria-label", game.label);
          anchor.href = `https://www.epicgames.com${game.url}`;

          const imageWrapper = document.createElement("div");
          imageWrapper.classList.add("GamesSectionTile__image-wrapper");

          const image = document.createElement("img");
          image.alt = game.label;
          image.classList.add("GamesSectionTile__image");
          image.src = game.image;
          image.loading = "auto";
          image.setAttribute("aria-hidden", "true");

          const title = document.createElement("span");
          title.classList.add("GamesSectionTile__title");
          title.setAttribute("aria-hidden", "true");
          title.textContent = game.label;

          imageWrapper.appendChild(image);
          anchor.appendChild(imageWrapper);
          anchor.appendChild(title);
          listItem.appendChild(anchor);

          gamesList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  });
});
