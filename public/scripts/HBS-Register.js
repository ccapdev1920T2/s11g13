$(document).ready(()=>{
    //Username ajax to check if unique
    $("#regUName").blur(()=>{
        let username = $("#regUName").val()

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

    //email ajax to check if unique
    $("#regEmail").blur(()=>{
        let email = $("#regEmail").val()
        console.log("isEmail: " + email + "| " + isEmail(email))

        $.get("/asyncFindEmail", {email: email},  (result)=>{
            //Match found
            if (result.length >= 1){
                $("#emailfeedback").show();
                $("#regEmail").removeClass("is-valid")
                $("#regEmail").addClass("is-invalid")
            }
            //Empty input
            else if(email == ""){
                $("#emailfeedback").hide();
                $("#regEmail").removeClass("is-valid")
                $("#regEmail").removeClass("is-invalid")
            }
            //Is valid email
            else if (isEmail(email)){
                $("#emailfeedback").hide();
                $("#regEmail").addClass("is-valid")
                $("#regEmail").removeClass("is-invalid")
            }
        });
    })

    function isEmail(email){
        let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return regex.test(email);
    }
});
