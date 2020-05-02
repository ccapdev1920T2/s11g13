# Ticket or Leave It
CCAPDEV Term 2 AY1920 Machine Project - Online ticket reservation website

This website allows user to view movie synopis and reviews, as well as allow for booking movie tickets. 

Full list of the specifications for the project can be found [here](https://github.com/ccapdev1920T2/s11g13/blob/master/Group13%20S11%20MP%20Specifications.pdf).

## Getting Started

### Prerequisites

Ensure that you have [git](https://git-scm.com/downloads), [Node JS](https://nodejs.org/en/download/), and [MongoDB](https://www.mongodb.com/download-center/community) installed in your machine. 

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

4. Run the web server with `node app` 

## Dependencies

| Dependency | Description |
|:---:|---|
| [Bcrypt](https://www.npmjs.com/package/bcrypt) | Password hashing |
| [Bootstrap 4.4.1](https://getbootstrap.com/) | Frontend framework |
| [body-parser](https://www.npmjs.com/package/body-parser) | Form data parsing |
| [busyboy](https://www.npmjs.com/package/busboy) | Form data parser for files |
| [dotenv](https://www.npmjs.com/package/dotenv)| dotenv |
| [Express](https://www.npmjs.com/package/express) | Easy Server development |
| [Express-hbs](https://www.npmjs.com/package/express-hbs) | Integrated handlebars to express package - dynamic content rendering |
| [Express-validator](https://www.npmjs.com/package/express-validator) | Wrapper for validator to allow for input validation and sanitization |
| [Handlebars](https://www.npmjs.com/package/hbs) | view engine for dynamic data rendering |
| [jquery](https://www.npmjs.com/package/jquery) | Easier DOM manipulation + AJAX functions + Bootstrap dependency |
| [MongoDB](https://www.npmjs.com/package/mongodb) | Driver to connect to MongoDB Database |
| [Mongoose](https://www.npmjs.com/package/mongoose) | Object Modelling tool for MongoDB |
| [Multer](https://www.npmjs.com/package/multer) | Middleware for handling multipart/form-data |
| [Validator](https://www.npmjs.com/package/validator) | Library for string validation and sanitization |


## Authors
[Bianca Joy Benedictos](https://fb.me/biancajoyrb)

[John Henry Cagaoan](https://fb.me/jhcagaoan)

[Howard Montecillo](https://fb.me/howard.ang.7)

## License
This project is under the MIT License.

## Acknowledgments
- Sir Arren Antioquia, our mentor throughout the duration of CCAPDEV
- Our families and peers who provided feedback regarding our project's appearance
- Canvas, without it we will have a harder time accessing video tutorials provided by our professor