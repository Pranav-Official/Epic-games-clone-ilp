document.querySelector(".store-logo").addEventListener("click", () => {
  console.log("store logo");
  window.location.href = "../../../pages/discover.html";
});

document.querySelector(".epic-logo").addEventListener("click", () => {
  document.querySelector(".epic-menu ").classList.toggle("active");
  document.querySelector(".epic-menu-arrow").classList.toggle("active");
});
