document.addEventListener("DOMContentLoaded", function () {
  // Array of Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  // Function to populate the dropdown with states
  function populateStatesDropdown() {
    const stateDropdown = document.getElementById("state");

    // Add an initial option for the placeholder
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.text = "Select State";
    stateDropdown.appendChild(placeholderOption);

    // Loop through the array of states and create option elements
    indianStates.forEach(function (state) {
      const option = document.createElement("option");
      option.value = state;
      option.text = state;
      stateDropdown.appendChild(option);
    });

    // Add event listener to hide the label when an option is selected
    stateDropdown.addEventListener("change", function () {
      const stateLabel = document.querySelector(".payment-input__name span");
      stateLabel.style.display = "none";
    });
  }

  // Call the function to populate the dropdown
  populateStatesDropdown();
});
