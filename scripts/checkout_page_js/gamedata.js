document.addEventListener("DOMContentLoaded", function () {
  // Fetch the name from local storage
  var storedName = localStorage.getItem("personName");

  // Check if the name is available
  if (storedName) {
    // Update the content of the HTML element with the fetched name
    var accountNameElement = document.querySelector(".epic-account-name__name");
    accountNameElement.textContent = storedName;
  }
});

// <!-- Add this to the head of your HTML document -->
// <script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     databaseURL: "YOUR_DATABASE_URL",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
//   };

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   // Reference to the database
//   var database = firebase.database();
// </script>
