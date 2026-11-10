document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("offerings-list");
    var sortSelect = document.getElementById("sort");
    var cards = Array.from(list.querySelectorAll(".card"));
    function getName(card) {
        return card.querySelector("h2").textContent.trim();
    }

    function getPrice(card) {
        var text = card.querySelector(".price").textContent;
        return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
    }
    function showCards(orderedCards) {
        orderedCards.forEach(function (card) {
            list.appendChild(card);
        });
    }

    function shuffle(array) {
        var copy = array.slice();
        for (var i = copy.length - 1; i > 0; i--)
            {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }
        return copy;
    }

    showCards(shuffle(cards));
    sortSelect.addEventListener("change", function () {
        var sorted = cards.slice();
        if (sortSelect.value === "low") {
            sorted.sort(function (a, b) { return getPrice(a) - getPrice(b); });
        } else if (sortSelect.value === "high") {
            sorted.sort(function (a, b) { return getPrice(b) - getPrice(a); });
        } else if (sortSelect.value === "az") {
            sorted.sort(function (a, b) { return getName(a).localeCompare(getName(b)); });
        } else if (sortSelect.value === "za") {
            sorted.sort(function (a, b) { return getName(b).localeCompare(getName(a)); });
        }
        showCards(sorted);
    });
});