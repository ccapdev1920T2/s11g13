$(document).ready(()=>{
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

})