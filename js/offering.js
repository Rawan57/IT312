// ===== Club Offerings Page =====

var list = document.getElementsByClassName("offerings")[0];
var allCards = document.getElementsByClassName("card");
var hearts = document.getElementsByClassName("heart");
var sortMenu = document.getElementById("sort");
var searchBox = document.querySelectorAll(".search input")[0];
var filterButtons = document.querySelectorAll(".filter-buttons button");

// copy the cards into a normal array so we can sort them
var cards = [];
for (var i = 0; i < allCards.length; i++) {
  cards.push(allCards[i]);
}

// -——— helper functions -———
function getCardName(card) {
  return card.getElementsByTagName("a")[0].innerHTML;
}

function getCardPrice(card) {
  var priceText = card.getElementsByClassName("price")[0].innerHTML;
  return parseInt(priceText.match(/\d+/)[0]);
}

function getCardType(card) {
  return card.getElementsByTagName("p")[1].innerHTML;
}

function showCards() {
  for (var i = 0; i < cards.length; i++) {
    list.appendChild(cards[i]);
  }
}

// -——— 1) random order when the page opens -———
for (var i = cards.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = cards[i];
  cards[i] = cards[j];
  cards[j] = temp;
}
showCards();

// -——— 2) sort -———
sortMenu.onchange = function () {
  var choice = sortMenu.value;

  if (choice == "low") {
    cards.sort(function (a, b) { return getCardPrice(a) - getCardPrice(b); });
  } else if (choice == "high") {
    cards.sort(function (a, b) { return getCardPrice(b) - getCardPrice(a); });
  } else if (choice == "az") {
    cards.sort(function (a, b) {
      if (getCardName(a) < getCardName(b)) return -1;
      if (getCardName(a) > getCardName(b)) return 1;
      return 0;
    });
  } else if (choice == "za") {
    cards.sort(function (a, b) {
      if (getCardName(a) > getCardName(b)) return -1;
      if (getCardName(a) < getCardName(b)) return 1;
      return 0;
    });
  }
  showCards();
};

// -——— 3) filter buttons + search (extra) -———
var currentType = "All";

function applyFilters() {
  var text = searchBox.value.toLowerCase();

  for (var i = 0; i < cards.length; i++) {
    var typeOk = true;
    if (currentType == "Workshops") typeOk = getCardType(cards[i]).search(/Workshop/) != -1;
    if (currentType == "Classes") typeOk = getCardType(cards[i]).search(/Class/) != -1;
    if (currentType == "Activities") typeOk = getCardType(cards[i]).search(/Activity/) != -1;

    var searchOk = getCardName(cards[i]).toLowerCase().indexOf(text) != -1;

    if (typeOk && searchOk) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function filterClick() {
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].className = "";
  }
  this.className = "active";
  currentType = this.innerHTML;
  applyFilters();
}

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].onclick = filterClick;
}
filterButtons[0].className = "active";

searchBox.onkeyup = applyFilters;

// -——— 4) favourites (heart) -———
var favList = JSON.parse(localStorage.getItem("favorites"));

if (favList == null) {
  favList = [];
  var startNames = ["Table Tales", "Mexican Flavors", "Mystery Basket"];
  for (var k = 0; k < hearts.length; k++) {
    var startCard = hearts[k].parentNode.parentNode;
    for (var n = 0; n < startNames.length; n++) {
      if (getCardName(startCard) == startNames[n]) {
        hearts[k].innerHTML = "♥";
        favList.push({ name: startNames[n], html: startCard.innerHTML });
      }
    }
  }
  localStorage.setItem("favorites", JSON.stringify(favList));
}

function findFav(name) {
  for (var i = 0; i < favList.length; i++) {
    if (favList[i].name == name) {
      return i;
    }
  }
  return -1;
}

function toggleFavorite() {
  var card = this.parentNode.parentNode;
  var name = getCardName(card);
  var index = findFav(name);

  if (index == -1) {
    this.innerHTML = "♥";
    favList.push({ name: name, html: card.innerHTML });
  } else {
    this.innerHTML = "♡";
    favList.splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favList));
}

for (var i = 0; i < hearts.length; i++) {
  var card = hearts[i].parentNode.parentNode;
  if (findFav(getCardName(card)) != -1) {
    hearts[i].innerHTML = "♥";
  }
  hearts[i].onclick = toggleFavorite;
}

if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}