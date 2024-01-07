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
