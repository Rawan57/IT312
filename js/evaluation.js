var form = document.getElementById("evaluation-form");
var offeringMenu = document.getElementById("offering");
var feedbackBox = document.getElementById("feedback");
var ratingRow = document.getElementById("rating-row");

form.onsubmit = function () {
  var errors = "";

  // remove old highlights
  offeringMenu.className = "";
  feedbackBox.className = "";
  ratingRow.className = "options-row";

  // offering selected
  if (offeringMenu.value == "") {
    errors += "- Please choose the completed offering.\n";
    offeringMenu.className = "error";
  }

  // rating selected
  var ratingInput = null;
  var ratingBoxes = document.getElementsByName("rating");
  for (var i = 0; i < ratingBoxes.length; i++) {
    if (ratingBoxes[i].checked) {
      ratingInput = ratingBoxes[i];
    }
  }
  if (ratingInput == null) {
    errors += "- Please select a rating.\n";
    ratingRow.className = "options-row error";
  }

  // feedback written
  var feedback = feedbackBox.value.replace(/^\s+|\s+$/g, "");
  if (feedback == "") {
    errors += "- Please write your feedback.\n";
    feedbackBox.className = "error";
  }

  if (errors != "") {
    alert("Please complete the following:\n" + errors);
    return false;
  }

  // good rating (4 or 5) thank you, otherwise apology
  var rating = parseInt(ratingInput.value);
  if (rating >= 4) {
    alert("Thank you for your feedback!");
  } else {
    alert("We are sorry. We will work on improving it.");
  }

  window.location.href = "club_member_dashboard.html";
  return false;
};

if (localStorage.getItem("theme") == "dark") {
  document.body.className = "dark";
}