var themeBtn = document.getElementById("theme-btn");

function updateButtonText() {
  if (document.body.className == "dark") {
    themeBtn.innerHTML = "Light Mode";
  } else {
    themeBtn.innerHTML = "Dark Mode";
  }
}

if (localStorage.getItem("theme") == "dark") {
  document.body.className = "dark";
}
updateButtonText();

themeBtn.onclick = function () {
  if (document.body.className == "dark") {
    document.body.className = "";
    localStorage.setItem("theme", "light");
  } else {
    document.body.className = "dark";
    localStorage.setItem("theme", "dark");
  }
  updateButtonText();
};

//Back to Top
var topBtn = document.getElementById("back-to-top");

window.onscroll = function () {
  if (window.scrollY > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

//Real-time clock
var clockBox = document.getElementById("clock");

function updateClock() {
  var now = new Date();
  clockBox.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);
// Extra: Do you know? tips
var tips = [
  { title: "Salt is the Key for Delicious Pasta",
    text: "Salt the water before cooking pasta, for better taste and the perfect texture." },
  { title: "Rest Your Meat",
    text: "Let meat rest for 5-10 minutes after cooking so the juices stay inside." },
  { title: "Cold Butter for Flaky Dough",
    text: "Use cold butter when making pastry to get light and flaky layers." },
  { title: "Fresh Herbs at the End",
    text: "Add soft herbs like parsley and basil at the end to keep their flavor." },
  { title: "Dry Before You Sear",
    text: "Pat meat or vegetables dry before searing to get a golden crust." }
];

var tipIndex = 0;
var tipTitle = document.getElementById("tip-title");
var tipText = document.getElementById("tip-text");
var tipBtn = document.getElementById("tip-btn");

tipBtn.onclick = function () {
  tipIndex = tipIndex + 1;
  if (tipIndex == tips.length) {
    tipIndex = 0;
  }
  tipTitle.innerHTML = tips[tipIndex].title;
  tipText.innerHTML = tips[tipIndex].text;
};