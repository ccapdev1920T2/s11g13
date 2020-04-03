$(document).ready(()=>{
    //Username ajax to check if unique
    $("#regUName").blur(()=>{
        let username = $("#regUName").val()
        
        if(username == ""){
            $("#unamefeedback").hide();
            $("#regUName").removeClass("is-valid")
            $("#regUName").removeClass("is-invalid")
        }
        else{
            $.get("/checkUniqueUName", {username: username},  (result)=>{
                //Match found
                if (!result){
                    $("#unamefeedback").show();
                    $("#regUName").removeClass("is-valid")
                    $("#regUName").addClass("is-invalid")
                }
                //Is valid email
                else{
                    $("#unamefeedback").hide();
                    $("#regUName").addClass("is-valid")
                    $("#regUName").removeClass("is-invalid")
                }
            });
        }
        
    })

    //email ajax to check if unique
    $("#regEmail").blur(()=>{
        let email = $("#regEmail").val()
        //console.log("isEmail: " + email + "| " + isEmail(email))
        //Empty input
        if(email == ""){
            $("#emailfeedback").hide();
            $("#regEmail").removeClass("is-valid")
            $("#regEmail").removeClass("is-invalid")
        }
        else{
            $.get("/checkEmail", {email: email},  (result)=>{
                //Match found
                console.log(result.error)
                if (!(result.error == "none")){
                    $("#emailfeedback").show();
                    $("#regEmail").removeClass("is-valid")
                    $("#regEmail").addClass("is-invalid")
                    if(result.error == "invalid")
                        $("#emailfeedback").html("Invalid email address.");
                    else{
                        $("#emailfeedback").html("Email address unavailable");
                    }
                }
                //Is valid email
                // else if (isEmail(email))
                else {
                    $("#emailfeedback").hide();
                    $("#regEmail").addClass("is-valid")
                    $("#regEmail").removeClass("is-invalid")
                }
            });
        }
    })

    function isEmail(email){
        let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return regex.test(email);
    }
});
