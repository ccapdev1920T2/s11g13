const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const db = require('./models/database.js');
const db2 = require('./models/database_old.js');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/********* Routing *********/
const routes = require('./router/routes');
app.use('/', routes);
app.use('/register', routes);

/* To access public folder where CSS and assets are located  */
app.use(express.static(__dirname + '\\public'))


app.set("view engine", "hbs");


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
    
    return new hbs.SafeString(x);
});

hbs.registerHelper('showDay', function(shows, val) {
    let x = []; //new array
    let day = parseInt(val,10);
    let obj = {} //temporary object
    
    for(let i = 0; i < shows.length; i++){
        if (shows[i].day == day){
          obj= {
            movieID: shows[i].movieID,
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
const indexRoutes = require('./router/indexRoutes');
const registerRoutes = require('./router/registerRoutes');
const loginRoutes = require("./router/loginRoutes");
const adminRoutes = require("./router/adminRoutes");
const userRoutes = require("./router/userRoutes");
const movieRoutes = require("./router/moviesRoutes")

app.use('/', indexRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use("/user", userRoutes)
app.use('/movies', movieRoutes)
app.use('/admin', adminRoutes);
// app.get("/emailverification", (req, res, next)=>{res.render("confirmEmail", {pageName: "Confirm Email"})})
//TODO: Error page

app.use((req, res, next)=>{
    const error = new Error("The resource you are looking for does not exist, have been removed, renamed, or is temporarily unavailable. ")
    error.status =404;
    next(error);
})

app.use((err, req, res, next)=>{
    if (err.status != 404)
        res.status(500);
    else res.status(err.status);
    res.render("error", {
        pageName: "Error",
        error: {
            status: err.status,
            message: err.message
        }
    });
})


//Connecting to db
db.connect();

/** Server online **/
app.listen(port, ()=>{
    console.log("Server ready.");
    console.log(`App listening at port ${port}`);
    console.log(`Access at localhost:${port}/`);
})

 //db2.createDatabase();
 //db2.createCollection("users");
 //db2.createCollection("transactions");
 //db2.createCollection("ccinfo");
 //db2.createCollection("cart");
 //db2.createCollection("tickets");
 //db2.createCollection("shows");
 //db2.createCollection("media");
 //db2.createCollection("seats");
 //db2.createCollection("movies");
 //db2.createCollection("ratings");