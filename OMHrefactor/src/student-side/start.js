const pass = "password";
function check_password() {
    var text = document.getElementById("password_box");
    console.log(text.value);
    if (text.value == pass) {
        location.replace("exam.html")
        // TODO: CRYPTO FILE HANDLING
    }
}