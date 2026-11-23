
function validateJoinForm() {

    var name = document.getElementById("name").value;
    var photo = document.getElementById("photo");
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var expertise = document.getElementById("expertise").value;
    var skills = document.getElementById("skills").value;
    var education = document.getElementById("education").value;

    // Check empty fields
    if (name.trim() == "" ||
        photo.value == "" ||
        dob == "" ||
        email.trim() == "" ||
        expertise.trim() == "" ||
        skills.trim() == "" ||
        education.trim() == "") {

        alert("Please fill in all fields.");
        return false;
    }

    // Name must not start with a number
    if (/^[0-9]/.test(name.trim())) {
        alert("Name cannot start with a number.");
        return false;
    }

    // Check photo type
    if (photo.files.length == 0 ||
        !/^image\//.test(photo.files[0].type)) {

        alert("Please upload an image only.");
        return false;
    }

    // Check year of birth
    var birthYear = new Date(dob).getFullYear();

    if (birthYear > 2008) {
        alert("Year of birth must be 2008 or earlier.");
        return false;
    }

    // Valid form
    alert("Thank you, " + name +
          "! Your application has been submitted successfully.");

    return false;
}

// Connect the form to the validation function
document.getElementById("joinForm").onsubmit = validateJoinForm;


if (localStorage.getItem("theme") == "dark") {
document.body.className = "dark";
}