
var themeBtn = document.getElementById("theme-btn");

function updateButtonText() {
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "Light Mode";
  } else {
    themeBtn.textContent = "Dark Mode";
  }
}

if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
}
updateButtonText();

themeBtn.onclick = function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
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
  clockBox.textContent = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);