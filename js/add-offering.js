if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}

var form = document.getElementById("OfferingForm");
var nameInput = document.getElementById("Name");
var imageInput = document.getElementById("Image");
var priceInput = document.getElementById("Price");
var descInput = document.getElementById("Description");

form.onsubmit = function () {
  var nameVal = nameInput.value.replace(/^\s+|\s+$/g, "");
  var imageVal = imageInput.value;
  var priceVal = priceInput.value.replace(/^\s+|\s+$/g, "");
  var descVal = descInput.value.replace(/^\s+|\s+$/g, "");
  var errors = "";

  // empty fields
  if (nameVal == "") errors += "- Please enter the offering name.\n";
  if (imageVal == "") errors += "- Please choose an offering image.\n";
  if (priceVal == "") errors += "- Please enter the offering price.\n";
  if (descVal == "") errors += "- Please enter the offering description.\n";

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
    description: descVal
  });
  localStorage.setItem("offerings", JSON.stringify(offerings));

  alert('Offering "' + nameVal + '" was added successfully!');
  form.reset();
  return false;
};