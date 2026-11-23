// ===== Manage Activity Leaders and Instructors Page =====

// all instructors are kept in an array of objects
var team = [
  { name: "Khalid", image: "Alya_images/Khalid.jpg", page: "khalid.html" },
  { name: "Manal",  image: "Alya_images/Manal.jpg",  page: "Manal.html" },
  { name: "Sara",   image: "Alya_images/Sara.jpg",   page: "Sara.html" }
];

var teamList = document.getElementById("team-list");
var teamForm = document.getElementById("team-form");
var instructorForm = document.getElementById("instructor-form");

// -——— show the list with checkboxes -———
function showTeam() {
  if (team.length == 0) {
    teamList.innerHTML = '<tr><td colspan="3">No instructors in the list.</td></tr>';
    return;
  }
  var html = "";
  for (var i = 0; i < team.length; i++) {
    var nameCell = team[i].name;
    if (team[i].page) {
      nameCell = '<a href="' + team[i].page + '">' + team[i].name + '</a>';
    }
    html += "<tr>" +
            '<td><input type="checkbox" name="deleteInstructor" value="' + i + '"></td>' +
            '<td><img src="' + team[i].image + '" alt="Chef image"></td>' +
            "<td>" + nameCell + "</td>" +
            "</tr>";
  }
  teamList.innerHTML = html;
}
showTeam();

// -——— 1) delete selected -———
teamForm.onsubmit = function () {
  var boxes = document.getElementsByName("deleteInstructor");
  var selectedNames = [];
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selectedNames.push(team[boxes[i].value].name);
    }
  }

  if (selectedNames.length == 0) {
    alert("Please select at least one instructor to delete.");
    return false;
  }

  var sure = confirm("Are you sure you want to delete: " + selectedNames.join(", ") + "?");
  if (sure) {
    // go backwards so the positions don't shift while deleting
    for (var j = boxes.length - 1; j >= 0;j--) {
      if (boxes[j].checked) {
        team.splice(boxes[j].value, 1);
      }
    }
    showTeam();
  }
  return false;
};

// -——— 2) add new instructor -———
instructorForm.onsubmit = function () {
  var name = document.getElementById("instructor-name").value;
  var dob = document.getElementById("instructor-dob").value;
  var education = document.getElementById("instructor-education").value;
  var expertise = document.getElementById("instructor-expertise").value;
  var photo = document.getElementById("instructor-photo");
  var email = document.getElementById("instructor-email").value;
  var skills = document.getElementById("instructor-skills").value;
  var about = document.getElementById("instructor-about").value;

  var errors = "";

  // empty fields
  if (name == "") errors += "- Name is empty.\n";
  if (dob == "") errors += "- Date of birth is empty.\n";
  if (education == "") errors += "- Education is empty.\n";
  if (expertise == "") errors += "- Expertise is empty.\n";
  if (photo.value == "") errors += "- Please choose a photo.\n";
  if (email == "") errors += "- Email is empty.\n";
  if (skills == "") errors += "- Skills is empty.\n";
  if (about == "") errors += "- About Me is empty.\n";

  // type of information
  if (name != "" && name.search(/^[A-Za-z]+( [A-Za-z]+)*$/) == -1) {
    errors += "- Name must contain letters only (no numbers or symbols).\n";
  }
  if (dob != "") {
    var birth = new Date(dob + "T00:00");
    if (birth >= new Date()) {
      errors += "- Date of birth must be in the past.\n";
    }
  }
  if (education != "" && education.search(/^[A-Za-z]/) == -1) {
    errors += "- Education must start with a letter.\n";
  }
  if (expertise != "" && expertise.search(/^[A-Za-z]/) == -1) {
    errors += "- Expertise must start with a letter.\n";
  }
  if (photo.value != "" && photo.value.search(/\.(jpg|jpeg|png|gif|webp)$/i) == -1) {
    errors += "- Photo must be an image (jpg, jpeg, png, gif, webp).\n";
  }
  if (email != "" && email.search(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/) == -1) {
    errors += "- Email is not valid (example: name@mail.com).\n";
  }
  if (skills != "" && skills.search(/^[A-Za-z]/) == -1) {
    errors += "- Skills must start with a letter.\n";
  }
  if (errors != "") {
    alert("Please fix the following:\n" + errors);
    return false;
  }

  // valid -> add to the list
  team.push({ name: name, image: URL.createObjectURL(photo.files[0]) });
  showTeam();
  alert(name + " was added to the team successfully!");
  instructorForm.reset();
  return false;
};

if (localStorage.getItem("theme") == "dark") {
document.body.className = "dark";
}