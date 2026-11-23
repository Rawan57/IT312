if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}

var form = document.getElementById("OfferingForm");
var nameInput = document.getElementById("Name");
var imageInput = document.getElementById("Image");
var priceInput = document.getElementById("Price");
var descInput = document.getElementById("Description");
var typeInputs = document.getElementsByName("type");
var dateInput = document.getElementById("OfferingDate");
var timeInput = document.getElementById("OfferingTime");
var aboutInput = document.getElementById("About");
var learnInput = document.getElementById("Learn");
var ingredientsInput = document.getElementById("Ingredients");

function clean(text) {
  return text.replace(/^\s+|\s+$/g, "");
}

form.onsubmit = function () {
  var nameVal = clean(nameInput.value);
  var imageVal = imageInput.value;
  var priceVal = clean(priceInput.value);
  var descVal = clean(descInput.value);
  var dateVal = dateInput.value;
  var timeVal = timeInput.value;
  var aboutVal = clean(aboutInput.value);
  var learnVal = clean(learnInput.value);
  var ingredientsVal = clean(ingredientsInput.value);

  // which offering type is selected?
  var typeVal = "";
  for (var i = 0; i < typeInputs.length; i++) {
    if (typeInputs[i].checked) {
      typeVal = typeInputs[i].value;
    }
  }

  var errors = "";

  // empty fields
  if (nameVal == "") errors += "- Please enter the offering name.\n";
  if (imageVal == "") errors += "- Please choose an offering image.\n";
  if (priceVal == "") errors += "- Please enter the offering price.\n";
  if (descVal == "") errors += "- Please enter the offering description.\n";
  if (typeVal == "") errors += "- Please choose the offering type.\n";
  if (dateVal == "") errors += "- Please choose the offering date.\n";
  if (timeVal == "") errors += "- Please choose the offering time.\n";
  if (aboutVal == "") errors += "- Please write about this offering.\n";
  if (learnVal == "") errors += "- Please write what members will learn.\n";
  if (ingredientsVal == "") errors += "- Please enter the main ingredients.\n";

  // type of information
  if (nameVal != "" && nameVal.search(/^\d/) != -1) {
    errors += "- Offering name cannot start with a number.\n";
  }
  if (priceVal != "" && priceVal.search(/^\d+(\.\d+)?$/) == -1) {
    errors += "- Price must be a number (0 for free offerings).\n";
  }
  if (imageVal != "" && imageVal.search(/\.(jpg|jpeg|png|gif|webp)$/i) == -1) {
    errors += "- The file must be an image (jpg, jpeg, png, gif, webp).\n";
  }
  if (dateVal != "") {
    var chosen = new Date(dateVal + "T00:00");
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) {
      errors += "- Offering date cannot be in the past.\n";
    }
  }
  if (ingredientsVal != "" && ingredientsVal.search(/^\d+$/) != -1) {
    errors += "- Main ingredients must be text, not numbers.\n";
  }

  if (errors != "") {
    alert("Please fix the following:\n" + errors);
    return false;
  }

  // valid -> save in localStorage (array of objects)
  var offerings = JSON.parse(localStorage.getItem("offerings"));
  if (offerings == null) {
    offerings = [];
  }

  var parts = imageVal.split(/[\\\/]/);
  offerings.push({
    name: nameVal,
    image: parts[parts.length - 1],
    price: parseFloat(priceVal),
    description: descVal,
    type: typeVal,
    date: dateVal,
    time: timeVal,
    about: aboutVal,
    learn: learnVal,
    ingredients: ingredientsVal
  });
  localStorage.setItem("offerings", JSON.stringify(offerings));

  alert('Offering "' + nameVal + '" was added successfully!');
  form.reset();
  return false;
};