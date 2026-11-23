// ===== Request to Join an Offering Page =====

var form = document.getElementById("request-form");
var offeringMenu = document.getElementById("offering");
var nameBox = document.getElementById("fullname");
var dateBox = document.getElementById("prefdate");
var requestsBox = document.getElementById("my-requests");

// requests added while the member stays on this page (not saved anywhere)
var newRequests = [];

form.onsubmit = function () {
  var errors = "";

  // 1) offering selected?
  if (offeringMenu.value == "") {
    errors += "- Please choose an offering.\n";
  }

  // 2) full name: letters only, at least two words
  var name = nameBox.value.replace(/^\s+|\s+$/g, "");
  if (name == "") {
    errors += "- Please enter your full name.\n";
  } else if (name.search(/\d/) != -1) {
    errors += "- Name must not contain numbers.\n";
  } else if (name.search(/[^A-Za-z ]/) != -1) {
    errors += "- Name must not contain symbols like ? ! @\n";
  } else if (name.search(/^[A-Za-z]+( +[A-Za-z]+)+$/) == -1) {
    errors += "- Please enter your full name (first and last name).\n";
  }

  // 3) preferred date must be in the future
  if (dateBox.value == "") {
    errors += "- Please choose a preferred date.\n";
  } else {
    var chosen = new Date(dateBox.value + "T00:00");
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen <= today) {
      errors += "- Preferred date must be a future date.\n";
    }
  }

  // something is wrong -> explain and stop
  if (errors != "") {
    alert("Please fix the following:\n" + errors);
    return false;
  }

  // form is valid
  var offeringName = offeringMenu.options[offeringMenu.selectedIndex].text;
  var stay = confirm("Your request to join \"" + offeringName + "\" was sent successfully!\n\n" +
    "Press OK to stay on this page and add another request.\n" +
    "Press Cancel to return to your dashboard.");

  if (stay) {
    newRequests.push({ offering: offeringName, name: name, date: dateBox.value });
    showRequests();
    form.reset();
  } else {
    window.location.href = "club_member_dashboard.html";
  }

  return false; // stop the page from reloading
};

function showRequests() {
  var html = "<h2>Your New Requests</h2>";
  html += "<table><tr><th>Offering</th><th>Member Name</th><th>Preferred Date</th></tr>";
  for (var i = 0; i < newRequests.length; i++) {
    html += "<tr><td>" + newRequests[i].offering + "</td>" +
      "<td>" + newRequests[i].name + "</td>" +
      "<td>" + newRequests[i].date + "</td></tr>";
  }
  html += "</table>";
  requestsBox.innerHTML = html;
}

if (localStorage.getItem("theme") == "dark") {
document.body.className = "dark";
}