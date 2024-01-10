(function () {
  var url =
    "https://static-assets-prod.epicgames.com/payment-web/static/aggregate/aggregate-EGS_MKT-false.js";
  var root = document.getElementById("aggregate");
  var script = document.createElement("script");
  script.src = url + "?" + Date.now();
  script.type = "text/javascript";
  root.appendChild(script);
})();

