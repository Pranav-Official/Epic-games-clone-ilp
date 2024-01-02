//API url and request
let url =
  "https://newsapi.org/v2/everything?" +
  "q=Games&" +
  "apiKey=4bdcb41ba60e45ae98fac6b55ae85c2c";

let req = new Request(url);

const apiKey = "4bdcb41ba60e45ae98fac6b55ae85c2c";
const apiUrl = `https://newsapi.org/v2/everything?q=Games&apiKey=${apiKey}`;
const apiUrlForSecondSection = `https://newsapi.org/v2/everything?q=Games&from=2024-01-02&sortBy=popularity&apiKey=${apiKey}`;

//Top news
const topNewsTemplate = (newsItem1, newsItem2) => {
  const formattedTimeAgo1 = timeAgo(newsItem1.publishedAt);
  const formattedTimeAgo2 = timeAgo(newsItem2.publishedAt);
  return `
 <div class="news-top">
        <div class="card-one">
          <img
            class="card-img-top"
            src="${newsItem1.urlToImage}"
            alt="${newsItem1.id}"
          />
          <div class="card-body">
            <p>${formattedTimeAgo1}</p>
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
            <p>${formattedTimeAgo2}</p>
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
};
//News appeared as rows
const rowNewsTemplate = (newsItem) => {
  const formattedTimeAgo = timeAgo(newsItem.publishedAt);
  return `
  <div class="row">
    <div class="row-left">
      <img src="${newsItem.urlToImage}" alt="newslist${newsItem.id}" />
    </div>
    <article class="row-right">
      <p>${formattedTimeAgo}</p>
      <h4 class="card-title">${newsItem.title}</h4>
      <p class="card-text">${newsItem.description}</p>
      <a href="${newsItem.url}">Read more</a>
    </article>
  </div>
  <hr>
`;
};
//function to display published time
function timeAgo(dateString) {
  const currentDate = new Date();
  const publishDate = new Date(dateString);
  const timeDifference = currentDate - publishDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Assuming a month is 30 days

  if (months > 0) {
    return `${months}M AGO`;
  } else if (days > 0) {
    return `${days}D AGO`;
  } else if (hours > 0) {
    return `${hours}H ago`;
  } else if (minutes > 0) {
    return `${minutes}MIN AGO`;
  } else {
    return `${seconds}SEC AGO`;
  }
}
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
//to display news from specific number
function displayNews(newsData, start) {
  const newsContainer = document.getElementById("newsContainer");
  const newsTop = document.getElementById("news-top");
  newsTop.innerHTML = "";
  newsContainer.innerHTML = "";
  for (let i = start; i < Math.min(start + 10, newsData.length); i++) {
    const newsItem1 = newsData[i];

    if (i == 1) {
      const newsItem2 = newsData[i + 1];
      let topNews = topNewsTemplate(newsItem1, newsItem2);
      newsTop.insertAdjacentHTML("beforeend", topNews);
      i++;
    } else {
      const newsDiv = document.createElement("div");
      newsDiv.innerHTML = rowNewsTemplate(newsItem1);
      newsContainer.appendChild(newsDiv);
    }
  }
}

let newsData;
async function init() {
  newsData = await fetchData(apiUrl);
  displayNews(newsData, 0);
}
//To calculate next page news.
const nextPage = (num) => {
  init();
  displayNews(newsData, num * 10);
};
// Initial load
init();
