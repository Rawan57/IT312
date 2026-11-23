
var themeBtn = document.getElementById("theme-btn");

if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}

themeBtn.onclick = function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
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
  clockBox.textContent = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);