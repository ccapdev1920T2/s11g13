$(document).ready(()=>{
    if ($("#fnholder").length){
        // console.log($("#fnholder").html())
        $("#regFName").prop("value", $("#fnholder").html())
        $("#fnholder").remove();
    }

    if ($("#lnholder").length){
        // console.log($("#lnholder").html())
        $("#regLName").prop("value", $("#lnholder").html())
        $("#lnholder").remove();
    }

    if ($("#unholder").length){
        // console.log($("#unholder").html())
        $("#regUName").prop("value", $("#unholder").html())
        $("#unholder").remove();
    }

    if ($("#emailholder").length){
        // console.log($("#emailholder").html())
        $("#regEmail").prop("value", $("#emailholder").html())
        $("#emailholder").remove();
    }

    if ($("#phoneholder").length){
        // console.log($("#phoneholder").html())
        $("#regPhone").prop("value", $("#phoneholder").html())
        $("#phoneholder").remove();
    }

    function validate(){
        if($("#regConfPass").val() == "")
        {
            $("#regConfPass").removeClass("is-valid")
            $("#regConfPass").removeClass("is-invalid")
            $("#regPassword").removeClass("is-valid")
            $("#regPassword").removeClass("is-invalid")
            $("#passMatch").addClass("invalid-feedback")
            $("#passMatch").removeClass("valid-feedback")
            $("#passMatch").hide();
        }
        else if ($("#regConfPass").val() != $("#regPassword").val())
        {
            $("#regConfPass").removeClass("is-valid")
            $("#regConfPass").addClass("is-invalid")
            $("#regPassword").removeClass("is-valid")
            $("#regPassword").addClass("is-invalid")
            $("#passMatch").addClass("invalid-feedback")
            $("#passMatch").removeClass("valid-feedback")
            $("#passMatch").html("Passwords do not match.")
            $("#passMatch").show()
        }
        else if ($("#regConfPass").val() == $("#regPassword").val())
        {
            $("#regConfPass").addClass("is-valid")
            $("#regConfPass").removeClass("is-invalid")
            $("#regPassword").addClass("is-valid")
            $("#regPassword").removeClass("is-invalid")
            $("#passMatch").removeClass("invalid-feedback")
            $("#passMatch").addClass("valid-feedback")
            $("#passMatch").html("Passwords match.")
            $("#passMatch").show()
        }
    }


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
                // console.log(result)
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
                
                else {
                    $("#emailfeedback").hide();
                    $("#regEmail").addClass("is-valid")
                    $("#regEmail").removeClass("is-invalid")
                }
            });
        }
    })

    $("#regConfPass").on(
        "keyup blur", validate
    )

    $("#regPassword").on(
        "blur mouseout", validate
    )

    // $('#regRegister').on(
    //     "click", ()=>{
    //         $.post("/")
            
    //     })
    // });
    
    // console.log(allValid)

    // let formData = {
    //     email: $("#regEmail").val(),
    //     username: $("#regUName").val(),
    //     firstName: $("#regFName").val(),
    //     lastName: $("#regLName").val(),
    //     mobileNumber: $("#regPhone").val(),
    // console.table(formData);
})