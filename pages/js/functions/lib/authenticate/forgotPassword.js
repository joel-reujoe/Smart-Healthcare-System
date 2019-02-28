function getEmail() {
    if (document.getElementById("email").value != "" && validateEmail(document.getElementById("email").value)) {
        var param = new URLSearchParams();
        param.append("action", "resetPassword");
        param.append("new_password_flag", "unset");
        param.append("email", document.getElementById("email").value);
        return param;
    }
    else {
        document.getElementById("email_error").style.color = "red";
        document.getElementById("email_error").innerHTML = "Please enter a valid email";
        return null;
    }
}
document.getElementById("email").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("email_error").innerHTML = "";
});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//# sourceMappingURL=forgotPassword.js.map