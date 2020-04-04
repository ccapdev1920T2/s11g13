// const jwt = require('jsonwebtoken');
// // path to use this checkAuth:
// // const redirectLogin = require('../middleware/redirectLogin');
// /********* Routing *********/
// const routes = require('../router/routes');
// // const express = require("express");
// // const app = express();
// // app.use('/', routes);

// module.exports = (req, res, next) => {
//     console.log("userId:" + req.session.userId);
//     if (!req.session.userId){
//         console.log(res)
//         return res.redirect(routes.login);
//     }
//     else{
//         return next();
//     }
// };