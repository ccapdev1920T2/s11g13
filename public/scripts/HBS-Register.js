$(document).ready(()=>{
    //Username ajax to check if unique
    $("#regUName").blur(()=>{
        let username = $("#regUName").val()
        console.log("username: "+ username)

        $.get("/asyncFindUName", {username: username},  (result)=>{
            //Match found
            if (result.length >= 1){
                $("#unamefeedback").show();
                $("#regUName").removeClass("is-valid")
                $("#regUName").addClass("is-invalid")
            }
            //Empty input
            else if(username == ""){
                $("#unamefeedback").hide();
                $("#regUName").removeClass("is-valid")
                $("#regUName").removeClass("is-invalid")
            }
            //Is valid email
            else{
                $("#unamefeedback").hide();
                $("#regUName").addClass("is-valid")
                $("#regUName").removeClass("is-invalid")
            }

        });
    })

    //
});
