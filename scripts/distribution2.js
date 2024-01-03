async function fetchData() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/83b9822a-8e29-45c0-afae-91a0df7c8158"
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function createDynamicContent() {
  const data = await fetchData();

  if (!data) {
    // Handle the case where data couldn't be fetched
    return;
  }

  const dynamicContentContainer = document.getElementById(
    "dynamicContentContainer2"
  );

  data.forEach((item) => {
    const sectionTwo = document.createElement("div");
    sectionTwo.className = "section-two-1-1";

    const sec2111 = document.createElement("div");
    sec2111.className = "sec-2-1-1-1";

    const divImage = document.createElement("div");
    divImage.className = "sec-2-1-1-1-image";

    const image = document.createElement("img");
    image.src = item.imageSrc;
    image.alt = item.altText;
    image.className = "sec-2-img-1";

    const divDesc = document.createElement("div");
    divDesc.className = "sec-2-1-1-1-desc";

    const header = document.createElement("h2");
    header.className = "sec-2-1-1-1-header";
    header.textContent = item.header;

    const marketCard = document.createElement("div");
    marketCard.className = "market-card";

    const description = document.createElement("h3");
    description.className = "market-card-1";
    description.textContent = item.description;

    divImage.appendChild(image);
    divDesc.appendChild(header);
    marketCard.appendChild(description);
    divDesc.appendChild(marketCard);

    sec2111.appendChild(divImage);
    sec2111.appendChild(divDesc);
    sectionTwo.appendChild(sec2111);

    dynamicContentContainer.appendChild(sectionTwo);
  });
}

createDynamicContent();
