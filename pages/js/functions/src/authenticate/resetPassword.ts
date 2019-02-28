function validateResetPassword()
{
    if(document.getElementById("old_password").value!="" && document.getElementById("old_password").value.length>=6)
    {
        if(document.getElementById("new_password").value!="" && document.getElementById("new_password").value.length>=6)
        {
            if(document.getElementById("cnew_password").value==document.getElementById("new_password").value && document.getElementById("cnew_password").value.length>=6)
            {
                var param=new URLSearchParams()
                param.append("action","resetPassword")
                param.append("new_password_flag","set")
                param.append("new_password",document.getElementById("new_password").value);
                param.append("email",localStorage.getItem("email"))
                console.log("hi")
                return param
            } else{
                document.getElementById("cnew_password_error").style.color="red"
                document.getElementById("cnew_password_error").innerHTML="Please re-enter the same password"
                return null
            }
        }else{
            document.getElementById("new_password_error").style.color="red"
            document.getElementById("new_password_error").innerHTML="Please enter a new password"
            return null
        }
    }else{
        document.getElementById("old_password_error").style.color="red"
        document.getElementById("old_password_error").innerHTML="Please enter a value"
        return null
    }
}

document.getElementById("new_password").addEventListener("click",function(event){
    document.getElementById("new_password_error").innerHTML=""
})


document.getElementById("cnew_password").addEventListener("click",function(event){
    document.getElementById("cnew_password_error").innerHTML=""
})


document.getElementById("old_password").addEventListener("click",function(event){
    document.getElementById("old_password_error").innerHTML=""
})