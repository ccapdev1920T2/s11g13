# Ticket or Leave It
CCAPDEV Term 2 AY1920 Machine Project - Online ticket reservation website

This website allows user to view movie synopis and reviews, as well as allow for booking movie tickets. 

Full list of the specifications for the project can be found [here](https://github.com/ccapdev1920T2/s11g13/blob/master/Group13%20S11%20MP%20Specifications.pdf).

## Getting Started

### Prerequisites

Ensure that you have [git](https://git-scm.com/downloads), [Node JS](https://nodejs.org/en/download/), [MongoDB and MongoDB Compass](https://www.mongodb.com/download-center/community), and [Heroku](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed in your machine. 

### Installing
Entering the following commands in your CLI:


1. Clone the repository through 
```
https://github.com/ccapdev1920T2/s11g13.git
```

2. Install all needed dependencies through `npm install`

3. Run the following commands
   | Command | Description |
   |:--:|:--:|
   | `node deleteAllData` | Clears all the contents of the Database in case you have used this program in the past. This can be skipped. |
   | `node makeCollection` | Creates the database and the collections|
   | `node addData` | Populates the database with dummy data. Includes admin account |

4. Refer to the [Heroku documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to get yourself set up with your heroku app.

## Dependencies

| Dependency | Description |
|:---:|---|
| [Bcrypt](https://www.npmjs.com/package/bcrypt) | Password hashing library. |
| [Bootstrap 4.4.1](https://getbootstrap.com/) | Responsive, mobile-first front-end framework. |
| [body-parser](https://www.npmjs.com/package/body-parser) | Node.js body parsing middleware. |
| [busboy](https://www.npmjs.com/package/busboy) | Node.js module for parsing incoming HTML form data. |
|[connect-mongo](https://www.npmjs.com/package/connect-mongo)| MongoDB session store for Connect and Express. |
| [dotenv](https://www.npmjs.com/package/dotenv)| loads environment variables fom a `.env` file into process.env. |
| [Express](https://www.npmjs.com/package/express) | Web framework for node. |
| [Express-hbs](https://www.npmjs.com/package/express-hbs) | Express handlebars template engine with multiple layouts, blocks, and cached partials. |
| [Express-validator](https://www.npmjs.com/package/express-validator) | Express middleware for Validator.js |
| [Handlebars/hbs](https://www.npmjs.com/package/hbs) | Express.js view engine for handlebars |
| [jquery](https://www.npmjs.com/package/jquery) | fast, small, and feature-rich JS library |
| [MongoDB](https://www.npmjs.com/package/mongodb) | Driver to connect to MongoDB Database |
| [Mongoose](https://www.npmjs.com/package/mongoose) | Object Modeling tool for MongoDB |
| [Multer](https://www.npmjs.com/package/multer) | Middleware for handling multipart/form-data |
|[Nodemailer](https://www.npmjs.com/package/nodemailer)| Send e-mails from Node.js |
| [Validator](https://www.npmjs.com/package/validator) | Library for string validation and sanitization |


## Authors
[Bianca Joy Benedictos](https://fb.me/biancajoyrb)

[John Henry Cagaoan](https://fb.me/jhcagaoan)

[Howard Montecillo](https://fb.me/howard.ang.7)

## License
This project is under the MIT License.

## Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Acknowledgments
- Sir Arren Antioquia, our mentor throughout the duration of CCAPDEV
- Our families and peers who provided feedback regarding our project's appearance
- Canvas, without it we will have a harder time accessing video tutorials provided by our professor