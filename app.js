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

hbs.registerHelper('ticketNumber', function(i) {
    i++;
    return i;
});

hbs.registerHelper('rateBuilder', function(rating) {
    var ctr = 1;
    var rate = parseInt(rating, 10);
    var x = '';

    while (ctr<=rate){
        x += '<i class="fa fa-minus text-warning"></i>';
        ctr++;
    }

    while (ctr<=5){
        x += '<i class="fa fa-minus text-secondary"></i>';
        ctr++;
    }
    
    console.log(x);
    return new hbs.SafeString(x);
});

/********* Routing *********/
const indexRouter = require('./router/indexRouter');
app.use('/', indexRouter);

/* To access static folder where CSS and assets are located  */
app.use(express.static(__dirname + '\\static'))

/** Server online **/
app.listen(port, ()=>{
    console.log("Server ready.");
    console.log(`App listening at port ${port}`);
    console.log(`Access at localhost:${port}/`);
})

db.createDatabase();
db.createCollection("USERS");
db.createCollection("TRANSACTIONS");
db.createCollection("CCINFO");
db.createCollection("CART");
db.createCollection("TICKETS");
db.createCollection("SHOWS");
db.createCollection("MEDIA");
db.createCollection("SEATS");
db.createCollection("MOVIES");
db.createCollection("RATINGS");