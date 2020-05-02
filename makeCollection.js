const db2 = require('./models/database_old.js');

db2.createDatabase();
db2.createCollection("users");
db2.createCollection("ccinfos");
db2.createCollection("tickets");
db2.createCollection("shows");
db2.createCollection("seats");
db2.createCollection("movies");
db2.createCollection("ratings");