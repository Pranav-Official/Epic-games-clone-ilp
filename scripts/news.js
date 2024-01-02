var url =
  "https://newsapi.org/v2/everything?" +
  "q=Games&" +
  "apiKey=4bdcb41ba60e45ae98fac6b55ae85c2c";

var req = new Request(url);
// fetch(url)
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// news.js

const apiKey = "4bdcb41ba60e45ae98fac6b55ae85c2c";
const apiUrl = `https://newsapi.org/v2/everything?q=Games&apiKey=${apiKey}`;
const apiUrlForSecondSection = `https://newsapi.org/v2/everything?q=Games&from=2024-01-02&sortBy=popularity&apiKey=${apiKey}`;

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

const secondNewsTemplate = (newsItem) => `
 <div class="news-top">
        <div class="card-one">
          <img
            class="card-img-top"
            src="${newsItem.urlToImage}"
            alt="${newsItem.id}"
          />
          <div class="card-body">
            <p>${newsItem.publishedAt}</p>
            <h4 class="card-title">
              ${newsItem.title}
            </h4>
            <p class="card-text">${newsItem.description}</p>
            <a href="${newsItem.url}">Read more</a>
          </div>
        </div>
        <div class="card-two">
          <img
            class="card-img-top"
            src="${newsItem.urlToImage}"
            alt="${newsItem.id}"
          />
          <div class="card-body">
            <p>${newsItem.publishedAt}</p>
            <h4 class="card-title">
             ${newsItem.title}
            </h4>
            <p class="card-text">
              ${newsItem.description}
            </p>
            <a href="${newsItem.url}">Read more</a>
          </div>
        </div>
      </div>
`;

async function fetchData(apiUrl) {
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
  const newsTop = document.getElementById("news-top");
  newsTop.innerHTML = "";
  newsContainer.innerHTML = "";
  for (let i = 0; i < Math.min(10, newsData.length); i++) {
    const newsItem = newsData[i];
    if (i == 1) {
      let topNews = secondNewsTemplate(newsItem);
      newsTop.insertAdjacentHTML("beforeend", topNews);
      i++;
    } else {
      const newsDiv = document.createElement("div");
      newsDiv.innerHTML = newsTemplate(newsItem);
      newsContainer.appendChild(newsDiv);
    }
  }
}

// function displaySecondNews(secondNewsData) {
//   const secondNewsContainer = document.querySelector(".news-top");
//   secondNewsContainer.innerHTML = ""; // Clear existing content

//   secondNewsData.forEach((newsItem) => {
//     const newsDiv = document.createElement("div");
//     newsDiv.innerHTML = secondNewsTemplate(newsItem);
//     secondNewsContainer.appendChild(newsDiv);
//   });
// }

async function init() {
  const newsData = await fetchData(apiUrl);
  displayNews(newsData);

  //   const secondNewsData = await fetchData(apiUrlForSecondSection);
  //   displaySecondNews(secondNewsData);
}

// Initial load
init();
