const apiKey = "4bdcb41ba60e45ae98fac6b55ae85c2c";
const apiUrl = `https://newsapi.org/v2/everything?q=Games&apiKey=${apiKey}`;

const newsReadMoreTemplate = (newsItem) => {
  return `
  <title id="read-page-title">${newsItem.title}</title>
    <div class="newsRead-title-img">
      <img
        id="newsRead-headimg"
        src="${newsItem.urlToImage}"
        alt="${newsItem.id}"
      />
    </div>
    <div class="newsRead-title">
      <h3 id="newsRead-head">${newsItem.title}</h3>
    </div>
    <br />
    <div class="newsRead-date"><p id="">${newsItem.publishedAt}</p></div>
    <br />
    <div class="newsRead-author">By ${newsItem.author}</div>
    <div class="newsRead-description">
      <p>${newsItem.content}</p>
    </div>`;
};

const displayNewsReadmore = (newsItem) => {
  const newsReadDiv = document.getElementById("newsRead-content");
  newsReadDiv.innerHTML = newsReadMoreTemplate(newsItem);
};

// async function fetchSingleNews(apiUrl) {
//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     return data.articles[0]; // Assuming you want details of the first news article
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     return null;
//   }
// }

// async function init() {
//   const newsItem = await fetchSingleNews(apiUrl);
//   displayNewsReadmore(newsItem);
// }

// // Initial load
// init();
