// ===== Member Dashboard: My Favourite =====

var favBox = document.getElementById("favourite-list");
var favList = JSON.parse(localStorage.getItem("favorites"));

if (favList == null) {
  favList = [];
  var startCards = favBox.getElementsByClassName("card");
  for (var k = 0; k < startCards.length; k++) {
    var startName = startCards[k].getElementsByTagName("a")[0].innerHTML;
    favList.push({ name: startName, html: startCards[k].innerHTML });
  }
  localStorage.setItem("favorites", JSON.stringify(favList));
}

function showFavourites() {
  if (favList.length == 0) {
    favBox.innerHTML = "<p>No favourites yet. Tap ♡ on any offering to add it here.</p>";
    return;
  }
  var html = "";
  for (var i = 0; i < favList.length; i++) {
    html += '<div class="card">' + favList[i].html + '</div>';
  }
  favBox.innerHTML = html;

  var hearts = favBox.getElementsByClassName("heart");
  for (var j = 0; j < hearts.length; j++) {
    hearts[j].index = j;
    hearts[j].onclick = removeFavourite;
  }
}

function removeFavourite() {
  favList.splice(this.index, 1);
  localStorage.setItem("favorites", JSON.stringify(favList));
  showFavourites();
}

showFavourites();

if (localStorage.getItem("theme") == "dark") {
document.body.className = "dark";
}