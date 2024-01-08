function showAdditionalFields(method) {
  // Hide all additional fields
  var allFields = document.querySelectorAll(".additional-fields");
  allFields.forEach(function (field) {
    field.style.display = "none";
  });

  // Show the specific additional fields based on the selected method
  var specificField = document.getElementById(method + "Fields");
  if (specificField) {
    specificField.style.display = "block";
  }
}
