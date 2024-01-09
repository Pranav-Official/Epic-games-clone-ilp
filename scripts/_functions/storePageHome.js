import fetchData from "../_functions/rawgfetchGamesdata.js";
import { API_KEY } from "../../environment.js";
import { cartItemCount } from "./cartfunctions.js";

const searchSuggestionDOM = (results) => {
  const suggentionItems = document.querySelectorAll(".search-suggestion-item");
  try {
    for (let i = 0; i < 4; i++) {
      console.log(results[i].name);
      suggentionItems[i].querySelector("h4").textContent = results[i].name;
      suggentionItems[i].setAttribute("data-slug", results[i].slug);
      suggentionItems[i].querySelector("img").src = results[i].background_image;
    }
  } catch (e) {
    console.log(e);
  }
};

document.querySelector(".store-logo").addEventListener("click", () => {
  console.log("store logo");
  window.location.href = "../../../pages/discover.html";
});

document.querySelector(".epic-logo").addEventListener("click", () => {
  document.querySelector(".epic-menu ").classList.toggle("active");
  document.querySelector(".epic-menu-arrow").classList.toggle("active");
});

// document.querySelector(".body-container").addEventListener("click", () => {
//   document.querySelector(".epic-menu ").classList.remove("active");
//   document.querySelector(".epic-menu-arrow").classList.remove("active");
// });

document.querySelector(".profile").addEventListener("click", () => {
  let userId = localStorage.getItem("userId");
  if (userId) {
    document.querySelector(".profile-menu  ").classList.toggle("active");
  } else {
    window.location.href = "../../pages/login_page/login.html";
  }
});

document.querySelector(".profile").addEventListener("mouseover", () => {
  let userId = localStorage.getItem("userId");
  if (userId) {
    document.querySelector(".profile-menu  ").classList.add("active");
  }
});

document.querySelector(".profile-menu").addEventListener("mouseover", () => {
  let userId = localStorage.getItem("userId");
  if (userId) {
    document.querySelector(".profile-menu  ").classList.add("active");
  }
});

document.querySelector(".profile").addEventListener("mouseout", () => {
  document.querySelector(".profile-menu  ").classList.remove("active");
});

document.querySelector(".profile-menu").addEventListener("mouseout", () => {
  document.querySelector(".profile-menu  ").classList.remove("active");
});

document.querySelector(".navbar-sign-out").addEventListener("click", () => {
  let userId = localStorage.getItem("userId");
  if (userId) {
    localStorage.removeItem("userId");
  }
});

try {
  document.querySelector("#search-field").addEventListener("input", () => {
    let searchValue = document.querySelector("#search-field").value;
    if (searchValue.length > 2) {
      document.querySelector(".search-suggestion-box").classList.add("active");
      searchSuggestionBoxFuction(searchValue);
    } else {
      document
        .querySelector(".search-suggestion-box")
        .classList.remove("active");
    }
  });
} catch (error) {
  console.log("no secondary nav in this page");
}

//navigation links
document.querySelector("#distribution-link").addEventListener("click", () => {
  window.location.href = "../../pages/distribution_page/distribution.html";
});

document.querySelector("#support-link").addEventListener("click", () => {
  window.location.href = "../../pages/support_page/epic-games-support.html";
});
document.querySelector("#discover-link").addEventListener("click", () => {
  window.location.href = "../../pages/discover.html";
});
document.querySelector("#browse-link").addEventListener("click", () => {
  window.location.href = "../../pages/browse_page.html";
});
document.querySelector("#news-link").addEventListener("click", () => {
  window.location.href = "../../pages/news.html";
});
document.querySelector("#wishlist-link").addEventListener("click", () => {
  window.location.href = "../../pages/wishlist.html";
});
document.querySelector("#cart-link").addEventListener("click", () => {
  window.location.href = "../../pages/cart.html";
});

const searchSuggestionBoxFuction = async (searchValue) => {
  const data = await fetchData(API_KEY, [
    ["search", searchValue],
    // ["ordering", "-released"],
    // ["metacritic", "70", "100"],
  ]);
  if (data.count < 4) {
    document.querySelector(".search-suggestion-box").classList.remove("active");
  }
  // console.log(data.results);
  searchSuggestionDOM(data.results);
};

const upadateCartCount = async () => {
  const cartCount = await cartItemCount();
  document.querySelector("#cart-count").textContent = cartCount;
};

upadateCartCount();

const enterPage = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    document.querySelector(".right-nav").setAttribute("style", "display:none");
  }
};

enterPage();
