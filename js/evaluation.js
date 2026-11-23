

var form = document.getElementById("evaluation-form");
var offeringMenu = document.getElementById("offering");
var feedbackBox = document.getElementById("feedback");
var ratingRow = document.getElementById("rating-row");

form.onsubmit = function () {
  var errors = "";

  // remove old highlights
  offeringMenu.classList.remove("error");
  feedbackBox.classList.remove("error");
  ratingRow.classList.remove("error");

  // offering selected
  if (offeringMenu.value == "") {
    errors += "- Please choose the completed offering.\n";
    offeringMenu.classList.add("error");
  }

  // rating selected
  var ratingInput = document.querySelector('input[name="rating"]:checked');
  if (ratingInput == null) {
    errors += "- Please select a rating.\n";
    ratingRow.classList.add("error");
  }

  //feedback written
var feedback = feedbackBox.value.trim();
if (feedback == "") {
    errors += "- Please write your feedback.\n";
    feedbackBox.classList.add("error");
  }

  if (errors != "") {
    alert("Please complete the following:\n" + errors);
    return false;
  }

  // good rating (4 or 5) thank you, otherwise apology
  var rating = Number(ratingInput.value);
  if (rating >= 4) {
    alert("Thank you for feedback!.");
  } else {
    alert("We are sorry . We will work on improving it.");
  }

  window.location.href = "club_member_dashboard.html";
  return false;
};

if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}