const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");

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

/* To access static folder where CSS and assets are located  */
app.use(express.static(__dirname + '\\static'))

/** Server online **/
app.listen(port, ()=>{
    console.log("Server ready.");
    console.log(`App listening at port ${port}`);
    console.log(`Access at localhost:${port}/`);
})