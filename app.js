const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const db = require('./database');

const app = express();
const port = 3000;

app.set("view engine", "hbs");
// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/**** Set partials here ****/
hbs.registerPartials(__dirname+ "\\views\\partials")

/**** Helper functions ****/
hbs.registerHelper("navBuilder", (activeLoc, headerName, url)=>{
    let element;
    // console.log(headerName + " | " + activeLoc); //Check for proper comparison
    if (activeLoc === headerName)
        element = '<a class="nav-link active" href="'+ url + '">' + headerName + '</a>';
    else
        element = '<a class="nav-link" href="'+ url + '">' + headerName + '</a>';
    return new hbs.SafeString(element);
})

/* Easier way to render tickets pero kabado ako kasi merong naliligaw na closing tag ng div sa tickets.hbs */
hbs.registerHelper('ticketBorder', (status)=>{
    let x = "";
    if(status=="bought"){
        x = '<div class="card border-success mb-4 mx-2" style="width: 19rem;">';
    }
    else if(status=="booked"){
        x = '<div class="card border-warning mb-4 mx-2" style="width: 19rem;">'
    }

    return new hbs.SafeString(x);
});

//For navbar and userprofile.hbs
hbs.registerHelper('userHrefBuilder', (username, loc)=>{
    let string = "";
    string += '/user/' + username + '/' + loc;
    return string;
});

//movie-view delete comment button
hbs.registerHelper('deleteBtnBuilder', (loggedIn, commentUname)=>{
    if(loggedIn==commentUname){
        return new hbs.SafeString('<button class="btn btn-sm btn-danger" onclick="$(this).parents(\'.card\').remove()">Delete</button>');
    }
});


hbs.registerHelper('bookedTicketsArray', (tickets)=>{
    let bookedTickets = [];
    tickets.forEach(element => {
        if(element.status == "booked"){
            bookedTickets.push(element);
        }
    });
    // console.table(bookedTickets);
    return bookedTickets;
});

hbs.registerHelper('ticketNumber', (i)=>{
    i++;
    return i;
});

/* Purge this code with holy water oh my God */
// hbs.registerHelper('ticketSeatsBuilder', (seats)=>{
//     let string = "";
//     seats.forEach(element => {
//         string += element + " ";
//     });
//     console.log(string);
//     return string;
// })

// hbs.registerHelper('ticketBuilder', (status, seats, details)=>{
//     let x = "";
//     let y = '<div class="card-header py-2"><h5 class="mb-0">'+ details.title + '</h5></div><div class="card-body p-0">'+
//     '<table class="table table-sm table-borderless text-center mb-0"><tr><td><h6>Show Date:</h6></td><td>'+ details.showDate +
//     '</td></tr><tr><td><h6>Show Time:</b></td><td>'+ details.showTime +'</td></tr><tr><td><h6>Seats:</h6></td><td>' + seats +
//     '</td></tr><tr><td><h6>Total Cost:</h6></td><td> PHP'+ details.totalCost +
//     '</td></tr></table></div><div class="card-footer py-1"><small class="text-muted">Booked: ' + details.dateBooked + '</small></div></div>'
    
//     console.log(status=="booked");
//     if(status=="bought"){
//         x = '<div class="card border-success mb-4" style="width: 20rem;">';
//     }
//     else if(status=="booked"){
//         x = '<div class="card border-warning mb-4" style="width: 20rem;">'
//     }
//     else{
//         x = ""; y = "";
//     }

//    return new hbs.SafeString(x+y);
// });



hbs.registerHelper('rateBuilder', function(rating) {
    var arren = 1;
    var rate = parseInt(rating, 10);
    var x = '';

    while (arren<=rate){
        x += '<i class="fa fa-star text-warning"></i>\n';
        arren++;
    }

    while (arren<=5){
        x += '<i class="fa fa-star"></i>\n';
        arren++;
    }

    /*  Di pa gumagana sa ngayon:
        
        
    */
    
    return new hbs.SafeString(x);
});

hbs.registerHelper('showDay', function(shows, val) {
    let x = []; //new array
    let day = parseInt(val,10);
    let obj = {} //temporary object
    
    for(let i = 0; i < shows.length; i++){
        if (shows[i].day == day){
          obj= {
            title: shows[i].title,
            genre: shows[i].genre,
            rating: shows[i].rating,
            date: shows[i].date,
            time: shows[i].time};
          x.push(obj);  
        }
      }
    
    return x;
});


/********* Routing *********/
const indexRouter = require('./router/indexRouter');
app.use('/', indexRouter);

/* To access public folder where CSS and assets are located  */
app.use(express.static(__dirname + '\\public'))

/** Server online **/
app.listen(port, ()=>{
    console.log("Server ready.");
    console.log(`App listening at port ${port}`);
    console.log(`Access at localhost:${port}/`);
})

// db.createDatabase();
// db.createCollection("USERS");
// db.createCollection("TRANSACTIONS");
// db.createCollection("CCINFO");
// db.createCollection("CART");
// db.createCollection("TICKETS");
// db.createCollection("SHOWS");
// db.createCollection("MEDIA");
// db.createCollection("SEATS");
// db.createCollection("MOVIES");
// db.createCollection("RATINGS");