$(document).ready(()=>{
    $('[data-toggle="tooltip"]').tooltip(); //initialize tooltip for CVV

    for(let i = 1; i <= 12; i++){
        let x = document.createElement("option");
        x.setAttribute("value", i);
        $(x).html(i);
        $("#expiryMonth").append(x);
    }

    let currYear = new Date().getFullYear();

    for(let i = 0; i <=15; i++){
        let x = document.createElement("option");
        x.setAttribute("value", currYear + i);
        $(x).html(currYear + i);
        $("#expiryYear").append(x);
    }

    $("#cardNum").on("keyup blur", ()=>{
        let cardNum = $("#cardNum").val();
        
        if (cardNum == ""){
            $("#ccnumfeedback").hide();
            $("#cardNum").removeClass("is-valid")
            $("#cardNum").removeClass("is-invalid")
        }
        else{
            $.get('/checkCCNumber', {cardNum: cardNum}, result=>{
                if (result){
                    $("#ccnumfeedback").hide();
                    $("#cardNum").removeClass("is-invalid")
                    $("#cardNum").addClass("is-valid")
                }
                else {
                    $("#ccnumfeedback").show();
                    $("#cardNum").removeClass("is-valid")
                    $("#cardNum").addClass("is-invalid")
                }
            })
        }
    })

    $("#cardCIV").on("keyup blur", ()=>{
        let cardCVV = $("#cardCIV").val();
        
        if (cardCVV == ""){
            $("#cvvfeedback").hide();
            $("#cardCIV").removeClass("is-valid")
            $("#cardCIV").removeClass("is-invalid")
        }
        else{
            $.get('/checkCVV', {cardCVV: cardCVV}, result=>{
                if (result){
                    $("#cvvfeedback").hide();
                    $("#cardCIV").removeClass("is-invalid")
                    $("#cardCIV").addClass("is-valid")
                }
                else {
                    $("#cvvfeedback").show();
                    $("#cardCIV").removeClass("is-valid")
                    $("#cardCIV").addClass("is-invalid")
                }
            })
        }
    })

    $("#otcEmail").on("keyup blur", ()=>{
        let email = $("#otcEmail").val();
        
        if (email == ""){
            $("#emailfeedback").hide();
            $("#otcEmail").removeClass("is-valid")
            $("#otcEmail").removeClass("is-invalid")
        }
        else{
            $.get('/checkPaymentEmail', {cardCVV: cardCVV}, result=>{
                if (result){
                    $("#emailfeedback").hide();
                    $("#otcEmail").removeClass("is-invalid")
                    $("#otcEmail").addClass("is-valid")
                }
                else {
                    $("#emailfeedback").show();
                    $("#otcEmail").removeClass("is-valid")
                    $("#otcEmail").addClass("is-invalid")
                }
            })
        }
    })

    

})