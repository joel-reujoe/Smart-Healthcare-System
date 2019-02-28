function getLoginDetails() {
    if (document.getElementById("username1").value != "" && document.getElementById("password").value.length >= 6) {
        if (document.getElementById("password").value != "" && document.getElementById("password").value.length >= 6) {
            var param = new URLSearchParams();
            param.append("action", "authenticate");
            param.append("username", document.getElementById("username1").value);
            param.append("password", document.getElementById("password").value);
            return param;
        }
        else {
            document.getElementById("password_error").style.color = "red";
            document.getElementById("password_error").innerHTML = "Please enter a valid password";
            return null;
        }
    }
    else {
        document.getElementById("username1_error").style.color = "red";
        document.getElementById("username1_error").innerHTML = "Please enter a username";
        return null;
    }
}
document.getElementById("username1").addEventListener("click", function (event) {
    document.getElementById("username1_error").innerHTML = "";
});
document.getElementById("password").addEventListener("click", function (event) {
    document.getElementById("password_error").innerHTML = "";
});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//# sourceMappingURL=login.js.map