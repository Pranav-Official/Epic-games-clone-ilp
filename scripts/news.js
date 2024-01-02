var url =
  "https://newsapi.org/v2/everything?" +
  "q=Games&" +
  "apiKey=4bdcb41ba60e45ae98fac6b55ae85c2c";

var req = new Request(url);
// fetch(url)
//   .then((response) => response.json())
//   .then((json) => console.log(json));

const apiKey = "4bdcb41ba60e45ae98fac6b55ae85c2c";
const apiUrl = `https://newsapi.org/v2/everything?q=Games&apiKey=${apiKey}`;

const newsTemplate = (newsItem) => `
  <div class="row">
    <div class="row-left">
      <img src="${newsItem.urlToImage}" alt="newslist${newsItem.id}" />
    </div>
    <article class="row-right">
      <p>${newsItem.publishedAt}</p>
      <h4 class="card-title">${newsItem.title}</h4>
      <p class="card-text">${newsItem.description}</p>
      <a href="${newsItem.url}">Read more</a>
    </article>
  </div>
  <hr>
`;

async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

function displayNews(newsData) {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";
  for (i = 0; i < 10; i++) {
    let newsItem = newsData[i];
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = newsTemplate(newsItem);
    newsContainer.appendChild(newsDiv);
  }
  // newsData.forEach((newsItem) => {
  //   const newsDiv = document.createElement("div");
  //   newsDiv.innerHTML = newsTemplate(newsItem);
  //   newsContainer.appendChild(newsDiv);
  // });
}

async function init() {
  const newsData = await fetchData();
  displayNews(newsData);
}

// Initial load
init();
