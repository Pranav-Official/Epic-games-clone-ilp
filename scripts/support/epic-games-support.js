// Function to fetch data from the JSON file
// script.js
// script.js
document.addEventListener('DOMContentLoaded', () => {
  const gamesList = document.getElementById('gamesList1');

  fetch("https://mocki.io/v1/a6d0d3d7-206a-4478-9cb0-069c2f1f8aa7") // Replace 'your_api_url' with the actual URL of your API
    .then((response) => response.json())
    .then((games) => {
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
