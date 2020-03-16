const express = require("express");
const hbs = require("hbs");
const port = 9090;

const app = express();

app.set("view engine", "hbs");

/**** Set partials here ****/
hbs.registerPartials(__dirname+ "\\views\\partials")


/********* Routing *********/
const indexRouter = require('./router/indexRouter');
app.use('/', indexRouter);

/* To access static folder where CSS is  */
app.use(express.static(__dirname + '\\static'))


app.listen(port, ()=>{
    console.log("Server ready.");
    console.log(`App listening at port ${port}`);
    console.log(`Access at localhost:${port}/`);
})