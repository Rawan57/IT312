if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}

var offeringsList = document.getElementById("offeringsList");

var offerings = JSON.parse(localStorage.getItem("offerings")) || [];

for (var i = 0; i < offerings.length; i++) {

var row = document.createElement("tr");

var nameCell = document.createElement("td");
nameCell.colSpan = 2;
nameCell.textContent = offerings[i].name;

var priceCell = document.createElement("td");
priceCell.colSpan = 3;
priceCell.textContent = offerings[i].price + " SAR";

row.appendChild(nameCell);
row.appendChild(priceCell);

offeringsList.appendChild(row);
}