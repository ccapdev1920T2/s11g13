$(document).ready(()=>{
    $("#profilepic").css("pointerEvents","none");

    $("#Edit").click(()=>{
        $("#Edit").hide();
        $("#Save").show();
        $("#File").show();
        $(".hidden").removeClass("hidden");
        $("#fName").removeAttr("readonly");
        $("#lName").removeAttr("readonly");
        $("#Email").removeAttr("readonly");
        $("#Mobile").removeAttr("readonly");
        $("#profilepic").css("pointerEvents","auto");

    })

    $("#Save").click(()=>{
        $("#Edit").show();
        $("#Save").hide();
        $("#File").hide();

        $("#fName").prop("readonly", true);
        $("#lName").prop("readonly", true);
        $("#Email").prop("readonly", true);
        $("#Mobile").prop("readonly", true);
        $("#profilepic").css("pointerEvents","none");
    })
})