async function fetchData() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/2eabaef6-136c-4b29-9d9f-a42a13e8306f"
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
    "dynamicContentContainer"
  );

  data.forEach((item) => {
    const sectionTwo = document.createElement("div");
    sectionTwo.className = "section-two-div-data";

    const sectioncontent = document.createElement("div");
    sectioncontent.className = "section-two-div-data-content";

    const divImage = document.createElement("div");
    divImage.className = "section-two-div-data-content-image";

    const image = document.createElement("img");
    image.src = item.imageSrc;
    image.alt = item.altText;
    image.className = "sec-2-img-1";

    const divDesc = document.createElement("div");
    divDesc.className = "section-two-div-data-content-desc";

    const header = document.createElement("h2");
    header.className = "section-two-div-data-content-header";
    header.textContent = item.header;

    const marketCard = document.createElement("div");
    marketCard.className = "market-card";

    const description = document.createElement("h3");
    description.className = "market-card-one";
    description.textContent = item.description;

    divImage.appendChild(image);
    divDesc.appendChild(header);
    marketCard.appendChild(description);
    divDesc.appendChild(marketCard);

    sectioncontent.appendChild(divImage);
    sectioncontent.appendChild(divDesc);
    sectionTwo.appendChild(sectioncontent);

    dynamicContentContainer.appendChild(sectionTwo);
  });
}

createDynamicContent();
