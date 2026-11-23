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