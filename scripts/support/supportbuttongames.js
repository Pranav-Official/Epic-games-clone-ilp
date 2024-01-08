async function handleButtonClick() {
  const button = document.getElementById("showAllButton");
  const gamesList = document.getElementById("gamesList");

  // Toggle the visibility of the button
  button.style.display = "none";

  // Fetch data from your API
  const apiUrl = "https://mocki.io/v1/2ea210d2-83a9-41c5-9be9-39ea27cac94d";
  try {
    const response = await fetch(apiUrl);
    const gamesData = await response.json();

    gamesData.forEach((game) => {
      const listItem = document.createElement("li");
      listItem.classList.add("GamesSectionList2__item");

      const gameLink = document.createElement("a");
      gameLink.classList.add("GamesSectionTile2__wrapper");
      gameLink.setAttribute("aria-label", game.label);
      gameLink.setAttribute("href", game.url);

      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("GamesSectionTile2__image-wrapper");

      const image = document.createElement("img");
      image.alt = game.label;
      image.classList.add("GamesSectionTile2__image");
      image.src = game.image;
      image.loading = "auto";
      image.setAttribute("aria-hidden", "true");

      imageWrapper.appendChild(image);
      gameLink.appendChild(imageWrapper);

      const title = document.createElement("span");
      title.classList.add("GamesSectionTile2__title");
      title.setAttribute("aria-hidden", "true");
      title.textContent = game.label;

      gameLink.appendChild(title);
      listItem.appendChild(gameLink);

      gamesList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
