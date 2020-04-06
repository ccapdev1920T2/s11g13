const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const session = require('express-session');

const db = require('./models/database.js');
const db2 = require('./models/database_old.js');

const TWO_HOURS = 1000 * 60 * 60 * 2

const app = express();
const {
    port = 3000,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quiet,it\'sasecret',
    SESS_LIFETIME = TWO_HOURS
} = process.env;

const IN_PROD = NODE_ENV === 'production'

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

app.use((req, res, next)=>{
    const {userId} = req.session;
    console.log('req.session: ' + req.session);
    console.log('req.session.userId: ' + req.session.userId);
    console.log('userId: ' + userId);
    if(userId){
        res.locals.user = User.find({username: req.session.userId})
    }
    console.log('res.locals.user: ' + res.locals.user);
    next();
})

/**1.) insert sa login:
 * const {userID} = req.session
 * 
 * 2.) create redirection route checking if there's a 
 * session/userid currently logged in - 
 * apply it to alll authenticated routes for redirection
 * 
 * 3.) insert this somewhere to update chuchu of session
 * const {user} = res.locals
 * 
 * 4.) FOR LOGIN (if successful/the user exists with right pass):
 * req.session.userId = username (orwhateverIDwewannause)
 * 
 * 5.) LOGOUT:
 * 
 * req.session.destroy(err => {
 *      if(err){
 *          return.redirect('<somewhere></somewhere>');
 *      }
 *      
 *      res.clearCookie(SESS_NAME);
 *      res.redirect('<somewhere></somewhere>');
 * })
*/

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*============================= CREATE ADMIN =============================*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/UsersModel.js');

User.find({userType: "Admin"})
    .exec()
    .then(user => {
        if(user.length >= 1){
            User.deleteOne({userType: 'Admin'}, function (err) {})
        }
    }) 
    
    bcrypt.hash("p455w0rd", 10, (err, hash)=>{
        if (err){
            return res.status(500).json({
                error:err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: 'admin@dlsu.edu.ph',
                username: 'bh0zXsArR3n',
                password: hash, 
                userType: 'Admin',
                firstName: 'Admin',
                lastName: 'Manager',
                pic: '/assets/profpic.png',
            });
            user
            .save()
            .then(result =>{
                console.log("Admin created!")
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    });
/*====================================================================*/


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