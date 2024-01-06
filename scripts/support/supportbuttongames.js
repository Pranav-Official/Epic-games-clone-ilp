document.addEventListener("DOMContentLoaded", () => {
  const showAllButton = document.getElementById("showAllButton");

  showAllButton.addEventListener("click", async () => {
    const targetGamesList = document.querySelector(
      ".GamesSectionList__wrapper2"
    );

    try {
      const response = await fetch(
        "https://mocki.io/v1/3141cac6-b85a-41af-91d4-eecbf3e7bed1"
      );
      const games = await response.json();

      displayGames(games, targetGamesList);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  });
});

function displayGames(games, listContainer) {
  listContainer.innerHTML = ""; // Clear existing content

  games.forEach((game) => {
    const listItem = document.createElement("li");
    listItem.classList.add("GamesSectionList__item1");

    const anchor = document.createElement("a");
    anchor.classList.add("GamesSectionTile2__wrapper");
    anchor.setAttribute("aria-label", game.label);
    anchor.href = game.url;

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("GamesSectionTile2__image-wrapper");

    const image = document.createElement("img");
    image.alt = game.label;
    image.classList.add("GamesSectionTile2__image");
    image.src = game.image;
    image.loading = "auto";
    image.setAttribute("aria-hidden", "true");

    const title = document.createElement("span");
    title.classList.add("GamesSectionTile2__title");
    title.setAttribute("aria-hidden", "true");
    title.textContent = game.label;

    imageWrapper.appendChild(image);
    anchor.appendChild(imageWrapper);
    anchor.appendChild(title);
    listItem.appendChild(anchor);

    listContainer.appendChild(listItem);
  });
}
