var url =
  "https://newsapi.org/v2/everything?" +
  "q=Games&" +
  "apiKey=4bdcb41ba60e45ae98fac6b55ae85c2c";

var req = new Request(url);

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

const secondNewsTemplate = (newsItem1, newsItem2) => `
 <div class="news-top">
        <div class="card-one">
          <img
            class="card-img-top"
            src="${newsItem1.urlToImage}"
            alt="${newsItem1.id}"
          />
          <div class="card-body">
            <p>${newsItem1.publishedAt}</p>
            <h4 class="card-title">
              ${newsItem1.title}
            </h4>
            <p class="card-text">${newsItem1.description}</p>
            <a href="${newsItem1.url}">Read more</a>
          </div>
        </div>
        <div class="card-two">
          <img
            class="card-img-top"
            src="${newsItem2.urlToImage}"
            alt="${newsItem2.id}"
          />
          <div class="card-body">
            <p>${newsItem2.publishedAt}</p>
            <h4 class="card-title">
             ${newsItem2.title}
            </h4>
            <p class="card-text">
              ${newsItem2.description}
            </p>
            <a href="${newsItem2.url}">Read more</a>
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

function displayNews(newsData, start) {
  const newsContainer = document.getElementById("newsContainer");
  const newsTop = document.getElementById("news-top");
  newsTop.innerHTML = "";
  newsContainer.innerHTML = "";
  for (let i = start; i < Math.min(start + 10, newsData.length); i++) {
    const newsItem1 = newsData[i];

    if (i == 1) {
      const newsItem2 = newsData[i + 1];
      let topNews = secondNewsTemplate(newsItem1, newsItem2);
      newsTop.insertAdjacentHTML("beforeend", topNews);
      i++;
    } else {
      const newsDiv = document.createElement("div");
      newsDiv.innerHTML = newsTemplate(newsItem1);
      newsContainer.appendChild(newsDiv);
    }
  }
}

let newsData;
async function init() {
  newsData = await fetchData(apiUrl);
  displayNews(newsData, 0);
}
const nextPage = (num) => {
  displayNews(newsData, num * 10);
};
// Initial load
init();
