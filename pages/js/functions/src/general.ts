var globalpath="http://localhost:8000/"

var limitCount;
function limitText(limitField, limitNum)
 {
   if (limitField.value.length > limitNum)
    {
     limitField.value = limitField.value.substring(0, limitNum);
    }
    else
    {
     if (limitField == '')
     {
       limitCount = limitNum - 0;
     }
     else
     {
       limitCount = limitNum - limitField.value.length;
     }
    }
   if (limitCount == 0)
     {
      document.getElementById("aadhaar_no").style.borderColor = "red";
       }
   else
     {
       document.getElementById("aadhaar_no").style.borderColor = "";
       }
 }

 function checkForComma(event){
   if(event.charCode==44)
   {
     return false
   }
   else{
     return true
   }
 }
 function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}