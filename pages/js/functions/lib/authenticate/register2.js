function gatherDocDetails() {
    var params = new URLSearchParams();
    if (document.getElementById("username1").value != "" && document.getElementById("username1").value.length >= 6) {
        if (document.getElementById("password").value != "" && document.getElementById("password").value.length >= 6) {
            if (document.getElementById("password").value == document.getElementById("cpassword").value) {
                if (document.getElementById("email").value != "" && validateEmail(document.getElementById("email").value)) {
                    if (document.getElementById("phone").value != "" && document.getElementById("phone").value.length == 10) {
                        var params = new URLSearchParams();
                        params.append("action", "insertUserDetails");
                        params.append("type", "doctor");
                        params.append("user_id", localStorage.getItem("userId"));
                        localStorage.removeItem("userId");
                        params.append("username", document.getElementById("username1").value);
                        params.append("password", document.getElementById("password").value);
                        params.append("email", document.getElementById("email").value);
                        params.append("phone", document.getElementById("phone").value);
                        return params;
                    }
                    else {
                        document.getElementById("phone_error").style.color = "red";
                        document.getElementById("phone_error").innerHTML = "Please enter a valid phone number";
                        return null;
                    }
                }
                else {
                    document.getElementById("email_error").style.color = "red";
                    document.getElementById("email_error").innerHTML = "Please enter a valid email";
                    return null;
                }
            }
            else {
                document.getElementById("cpassword_error").style.color = "red";
                document.getElementById("cpassword_error").innerHTML = "Please re-enter the same password";
                return null;
            }
        }
        else {
            document.getElementById("password_error").style.color = "red";
            document.getElementById("password_error").innerHTML = "Please enter a valid password ";
            return null;
        }
    }
    else {
        document.getElementById("username1_error").style.color = "red";
        document.getElementById("username1_error").innerHTML = "Please enter a user name";
        return null;
    }
}
document.getElementById("username1").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("username1_error").innerHTML = "";
});
document.getElementById("password").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("password_error").innerHTML = "";
});
document.getElementById("cpassword").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("cpassword_error").innerHTML = "";
});
document.getElementById("email").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("email_error").innerHTML = "";
});
document.getElementById("phone").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("phone_error").innerHTML = "";
});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//# sourceMappingURL=register2.js.map