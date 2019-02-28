function gatherAadhaarDetails(){
    var params=new URLSearchParams()
    if(document.getElementById("name").value!="")
    {
        if(document.getElementById("address").value!="")
        {
            if(document.getElementById("city").value!="")
            {
                if(document.getElementById("state").value!="")
                {
                    if(document.getElementById("pincode").value!="")
                    {
                        if(document.getElementById("gender").value!="notSelected")
                        {
                            if(document.getElementById("dob").value!="")
                            {
                                params.append("action","insertAadhaarDetails")
                                params.append("type","doctor")
                                params.append("aadhaar_no",document.getElementById("aadhaar_no").value)
                                params.append("name",document.getElementById("name").value)
                                params.append("address",document.getElementById("address").value)
                                params.append("city",document.getElementById("city").value)
                                params.append("state",document.getElementById("state").value)
                                params.append("pincode",document.getElementById("pincode").value)
                                params.append("gender",document.getElementById("gender").value)
                                params.append("dob",document.getElementById("dob").value)
                                return params
                            }
                            else{
                                document.getElementById("dob_error").style.color="red"
                                document.getElementById("dob_error").innerHTML="Please select a date of birth"
                                return null
                            }
                        }
                        else{
                            document.getElementById("gender_error").style.color="red"
                            document.getElementById("gender_error").innerHTML="Please select a gender"
                            return null
                        }
                    }
                    else{
                        document.getElementById("pin_error").style.color="red"
                        document.getElementById("pin_error").innerHTML="Please enter a 6 digit pin"
                        return null
                    }
                }
                else{
                    document.getElementById("state_error").style.color="red"
                    document.getElementById("state_error").innerHTML="Please enter a state"
                    return null
                }
            }
            else{
                document.getElementById("city_error").style.color="red"
                document.getElementById("city_error").innerHTML="Please enter a city"
                return null
            }
        }
        else{
        document.getElementById("address_error").style.color="red"
        document.getElementById("address_error").innerHTML="Please enter an address"
        return null        
        }
    }
    else{
        document.getElementById("name_error").style.color="red"
        document.getElementById("name_error").innerHTML="Please enter a name"
        return null        
    }
}
document.getElementById("name").addEventListener("click",function(event){
    document.getElementById("name_error").innerHTML=""    
})

document.getElementById("address").addEventListener("click",function(event){
    document.getElementById("address_error").innerHTML=""    
})

document.getElementById("city").addEventListener("click",function(event){
    document.getElementById("city_error").innerHTML=""    
})

document.getElementById("state").addEventListener("click",function(event){
    document.getElementById("state_error").innerHTML=""    
})

document.getElementById("pincode").addEventListener("click",function(event){
    document.getElementById("pin_error").innerHTML=""    
})

document.getElementById("gender").addEventListener("click",function(event){
    document.getElementById("gender_error").innerHTML=""    
})


document.getElementById("dob").addEventListener("click",function(event){
    document.getElementById("dob_error").innerHTML=""    
})