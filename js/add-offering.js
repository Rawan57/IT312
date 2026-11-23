if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}

var form = document.getElementById("OfferingForm");
var nameInput = document.getElementById("Name");
var imageInput = document.getElementById("Image");
var priceInput = document.getElementById("Price");
var descInput = document.getElementById("Description");

form.onsubmit = function () {

var nameVal = nameInput.value.trim();
var priceVal = priceInput.value.trim();
var descVal = descInput.value.trim();

if (nameVal === "") {
    alert("Please enter the offering name!");
    return false;
}

if (imageInput.files.length === 0) {
    alert("Please choose an offering image!");
    return false;
}

if (priceVal === "") {
    alert("Please enter the offering price!");
    return false;
}

if (descVal === "") {
    alert("Please enter the offering description!");
    return false;
}

if (nameVal.search(/^\d/) === 0) {
    alert("Offering name cannot start with a number!");
    return false;
}

if (isNaN(priceVal) || Number(priceVal) < 0) {
    alert("Price must be a positive number!");
    return false;
}

if (imageInput.files[0].type.search(/^image\//) !== 0) {
    alert("The file must be an image!");
    return false;
}

var reader = new FileReader();

reader.onload = function () {

    var offerings = JSON.parse(localStorage.getItem("offerings")) || [];

    offerings.push({
        name: nameVal,
        image: reader.result,
        price: Number(priceVal),
        description: descVal
    });

    localStorage.setItem("offerings", JSON.stringify(offerings));
    alert('Offering "' + nameVal + '" was added successfully!');
    form.reset();
};

reader.readAsDataURL(imageInput.files[0]);

return false;
};