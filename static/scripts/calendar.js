$(document).ready(function() {
    $("#Su").click(function(){
        console.log("Su pressed");
    });

    $("#Su").hover(function(){
        $("#Su").css('background-image', 'url("assets/su.png")');
    });

    $("#Su").mouseleave(function(){
        $("#Su").css('background-image', 'url("assets/suselected.png")');
    });

    $("#Mo").click(function(){
        console.log("Mo pressed");
    });

    $("#Mo").hover(function(){
        $("#Mo").css('background-image', 'url("assets/mo.png")');
    });

    $("#Mo").mouseleave(function(){
        $("#Mo").css('background-image', 'url("assets/moselected.png")');
    });

    $("#Tu").click(function(){
        console.log("Tu pressed");
    });

    $("#Tu").hover(function(){
        $("#Tu").css('background-image', 'url("assets/tu.png")');
    });

    $("#Tu").mouseleave(function(){
        $("#Tu").css('background-image', 'url("assets/tuselected.png")');
    });

    $("#We").click(function(){
        console.log("We pressed");
    });

    $("#We").hover(function(){
        $("#We").css('background-image', 'url("assets/we.png")');
    });

    $("#We").mouseleave(function(){
        $("#We").css('background-image', 'url("assets/weselected.png")');
    });

    $("#Th").click(function(){
        console.log("Th pressed");
    });

    $("#Th").hover(function(){
        $("#Th").css('background-image', 'url("assets/th.png")');
    });

    $("#Th").mouseleave(function(){
        $("#Th").css('background-image', 'url("assets/thselected.png")');
    });

    $("#Fr").click(function(){
        console.log("Fr pressed");
    });

    $("#Fr").hover(function(){
        $("#Fr").css('background-image', 'url("assets/fr.png")');
    });

    $("#Fr").mouseleave(function(){
        $("#Fr").css('background-image', 'url("assets/frselected.png")');
    });

    $("#Sa").click(function(){
        console.log("Sa pressed");
    });

    $("#Sa").hover(function(){
        $("#Sa").css('background-image', 'url("assets/sa.png")');
    });

    $("#Sa").mouseleave(function(){
        $("#Sa").css('background-image', 'url("assets/saselected.png")');
    });
});