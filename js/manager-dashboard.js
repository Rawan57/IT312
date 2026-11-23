if (localStorage.getItem("theme") == "dark") {
  document.body.className = "manager-body dark";
}

var offeringsList = document.getElementById("offeringsList");

var offerings = JSON.parse(localStorage.getItem("offerings"));
if (offerings == null) {
  offerings = [];
}

for (var i = 0; i < offerings.length; i++) {
  var row = document.createElement("tr");

  var nameCell = document.createElement("td");
  nameCell.innerHTML = offerings[i].name;

  var priceCell = document.createElement("td");
  priceCell.innerHTML = offerings[i].price + " SAR";

  row.appendChild(nameCell);
  row.appendChild(priceCell);

  offeringsList.appendChild(row);
}