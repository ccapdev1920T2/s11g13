$("#tabRegister").click(()=>{
    $("title").html("Register");
})
$("#tabLogin").click(()=>{
    $("title").html("Log In");
})

$("#logLogin").click(()=>{
    if($("#logUName").val()==="admin" && $("#logPassword").val()==="cutenihenry")
        window.location="admin.html"
    else window.location = "userprofile.html"
})

