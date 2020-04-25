const db = require('./models/database.js');
const db2 = require('./models/database_old.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = require('./models/UsersModel.js');
const Movies = require('./models/MoviesModel.js');
const Shows = require('./models/ShowsModel.js');
const Seats = require('./models/SeatsModel.js');
const Ratings = require('./models/RatingsModel.js');
const Tickets = require('./models/TicketsModel.js');
const multer = require('multer');

db.connect();

db2.createDatabase();
db2.createCollection("users");
db2.createCollection("ccinfo");
db2.createCollection("tickets");
db2.createCollection("shows");
db2.createCollection("seats");
db2.createCollection("movies");
db2.createCollection("ratings");

//Admin
bcrypt.hash("p455w0rd", 10, (err, hash)=>{
        if (err){
            return res.status(500).json({
                error:err
            });
        } else {
            const userDoc = new Users({
                _id: new mongoose.Types.ObjectId(),
                email: 'admin@dlsu.edu.ph',
                username: 'bh0zXsArR3n',
                password: hash, 
                userType: 'Admin',
                firstName: 'Admin',
                lastName: 'Manager',
                pic: '/assets/ProfilePictures/profpic.png',
            });
            

            db.insertOne(Users, userDoc, isInserted=>{
                if(isInserted)
                  console.log("Admin account created successfully.")
            })

        }
    });

//Users
bcrypt.hash('123123', 10, (err, hash)=>{
    if (err){
        return res.status(500).json({
            error:err
        });
    } else {
        //User 1
        var user = new Users({
            password: hash,
            _id: new mongoose.Types.ObjectId(),
            email: 'megan.knox@gmail.com',
            username: 'meganKnox',
            password: hash,
            userType: "User",
            firstName: 'Megan',
            lastName: 'Knox',
            mobileNumber: '09564468746',
            pic: "/assets/ProfilePictures/profpic.jpg",
        });
        
        db.insertOne(Users, user, function(result){
          console.log("User 1 created!");
        });

        //User 2
        var user = new Users({
            password: hash,
            _id: new mongoose.Types.ObjectId(),
            email: 'carolyn.ellison@gmail.com',
            username: 'carolynEllison',
            password: hash,
            userType: "User",
            firstName: 'Carolyn',
            lastName: 'Ellison',
            mobileNumber: '09564468747',
            pic: "/assets/ProfilePictures/profpic.jpg",
        });
        
        db.insertOne(Users, user, function(result){
          console.log("User 2 created!");
        });

        //User 3
        var user = new Users({
            password: hash,
            _id: new mongoose.Types.ObjectId(),
            email: 'sebastian.kerr@gmail.com',
            username: 'sebastianKerr',
            password: hash,
            userType: "User",
            firstName: 'Sebastian',
            lastName: 'Kerr',
            mobileNumber: '09564568748',
            pic: "/assets/ProfilePictures/profpic.jpg",
        });
        
        db.insertOne(Users, user, function(result){
          console.log("User 3 created!");
        });

        //User 4
        var user = new Users({
            password: hash,
            _id: new mongoose.Types.ObjectId(),
            email: 'ian.dowd@gmail.com',
            username: 'ianDowd',
            password: hash,
            userType: "User",
            firstName: 'Ian',
            lastName: 'Dowd',
            mobileNumber: '09564568749',
            pic: "/assets/ProfilePictures/profpic.jpg",
        });
        
        db.insertOne(Users, user, function(result){
          console.log("User 4 created!");
        });

    };
})

//Movies

//Movie 1
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama, Fantasy, Horror',
    title: 'The Lighthouse',
    aveScore: 0,
    synopsis: 'Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s.',
    cast: ['Robert Pattinson', 'Willem Dafoe', 'Valeriia Karaman'],
    posterUrl: '/assets/MoviePosters/TheLightHouse.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Hyag7lR8CPA',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 1 created!");
});

//Movie 2
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Comedy, Drama, Romance',
    title: 'Marriage Story',
    aveScore: 0,
    synopsis: 'A stage director and his actor wife struggle through a gruelling, coast-to-coast divorce that pushes them to their personal and creative extremes.',
    cast: ['Adam Driver', 'Scarlett Johansson', 'Julia Greer'],
    posterUrl: '/assets/MoviePosters/MarriageStory.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=BHi-a1n8t7M',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 2 created!");
});

//Movie 3
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Biography, Crime, Drama',
    title: 'The Irishman',
    aveScore: 0,
    synopsis: 'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa -- a powerful Teamster tied to organized crime.',
    cast: ['Robert De Niro', 'Al Pacino', 'Joe Pesci'],
    posterUrl: '/assets/MoviePosters/TheIrishMan.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=WHXxVmeGQUc',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 3 created!");
});

//Movie 4
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama, Sci-Fi',
    title: 'Transit',
    aveScore: 0,
    synopsis: 'In an attempt to flee Nazi-occupied France, Georg assumes the identity of a dead author but soon finds himself stuck in Marseilles, where he falls in love with Maria, a young woman searching for her missing husband.',
    cast: ['Franz Rogowski', 'Paula Beer', 'Godehard Giese'],
    posterUrl: '/assets/MoviePosters/Transit.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=R15ekRCq-eY',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 4 created!");
});

//Movie 5
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Biography, Drama, Romance',
    title: 'A Hidden Life',
    aveScore: 0,
    synopsis: 'Austrian farmer Franz Jägerstätter faces the threat of execution for refusing to fight for the Nazis during World War II.',
    cast: ['August Diehl', 'Valerie Pachner', 'Maria Simon'],
    posterUrl: '/assets/MoviePosters/AHiddenLife.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=qJXmdY4lVR0',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 5 created!");
});

//Movie 6
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama, Romance',
    title: 'Little Women',
    aveScore: 0,
    synopsis: 'Jo March reflects back and forth on her life, telling the beloved story of the March sisters - four young women, each determined to live life on her own terms.',
    cast: ['Saoirse Ronan', 'Emma Watson', 'Florence Pugh'],
    posterUrl: '/assets/MoviePosters/LittleWomen.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=AST2-4db4ic',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 6 created!");
});

//Movie 7
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Crime, Drama, Thriller',
    title: 'Uncut Gems',
    aveScore: 0,
    synopsis: 'With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.',
    cast: ['Adam Sandler', 'Julia Fox', 'Idina Menzel'],
    posterUrl: '/assets/MoviePosters/UncutGems.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vTfJp2Ts9X8',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 7 created!");
});

//Movie 8
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Adventure, Drama, Thriller',
    title: 'Monos',
    aveScore: 0,
    synopsis: 'On a remote mountaintop, eight kids with guns watch over a hostage and a conscripted milk cow.',
    cast: ['Sofia Buenaventura', 'Julián Giraldo', 'Karen Quintero'],
    posterUrl: '/assets/MoviePosters/Monos.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=1Qn70iqo-4Q',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 8 created!");
});

//Movie 9
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama',
    title: 'An Elephant Sitting Still',
    aveScore: 0,
    synopsis: 'Four people in a Chinese city live through a complicated day as their lives intersect.',
    cast: ['Yu Zhang', 'Yuchang Peng', 'Uvin Wang'],
    posterUrl: '/assets/MoviePosters/AnElephantSittingStill.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=G6j_d8ENXkY',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 9 created!");
});

//Movie 10
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama, Romance',
    title: 'Portrait of a Lady on Fire',
    aveScore: 0,
    synopsis: 'On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.',
    cast: ['Noémie Merlant', 'Adèle Haenel', 'Luàna Bajrami'],
    posterUrl: '/assets/MoviePosters/PortraitOfALadyOnFire.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=R-fQPTwma9o',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 10 created!");
});

//Movie 11
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama',
    title: 'Diane',
    aveScore: 0,
    synopsis: "Diane fills her days helping others and desperately attempting to bond with her drug-addicted son. As these pieces of her existence begin to fade, she finds herself confronting memories she'd sooner forget than face.",
    cast: ['Mary Kay Place', 'Jake Lacy', 'Estelle Parsons'],
    posterUrl: '/assets/MoviePosters/Diane.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Yl1WJA0T5II',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 11 created!");
});

//Movie 12
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Documentary, History',
    title: 'Apollo 11',
    aveScore: 0,
    synopsis: 'A look at the Apollo 11 mission to land on the moon led by commander Neil Armstrong and pilots Buzz Aldrin and Michael Collins.',
    cast: ['Neil Armstrong', 'Michael Collins', 'Buzz Aldrin'],
    posterUrl: '/assets/MoviePosters/Apollo11.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=3Co8Z8BQgWc',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 12 created!");
});

//Movie 13
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Comedy, Drama, Thriller',
    title: 'Parasite',
    aveScore: 0,
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    cast: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Jo'],
    posterUrl: '/assets/MoviePosters/Parasite.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=SEUXfv87Wpk',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 13 created!");
});

//Movie 14
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: ' Action, Crime, Thriller',
    title: 'John Wick: Chapter 3 – Parabellum',
    aveScore: 0,
    synopsis: "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
    cast: ['Keanu Reeves', 'Halle Berry', 'Ian McShane'],
    posterUrl: '/assets/MoviePosters/JohnWick3.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=M7XM597XO94',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 14 created!");
});

//Movie 15
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Documentary',
    title: 'The Great Hack',
    aveScore: 0,
    synopsis: 'The Cambridge Analytica scandal is examined through the roles of several affected persons.',
    cast: ['Brittany Kaiser', 'David Carroll', 'Paul-Olivier Dehaye'],
    posterUrl: '/assets/MoviePosters/TheGreatHack.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=iX8GxLP1FHo',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 15 created!");
});

//Movie 16
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Drama, Romance',
    title: 'To All the Boys: P.S. I Still Love You',
    aveScore: 0,
    synopsis: 'Lara Jean and Peter have just taken their relationship from pretend to officially official when another recipient of one of her old love letters enters the picture.',
    cast: ['Lana Condor', 'Noah Centineo', 'Jordan Fisher'],
    posterUrl: '/assets/MoviePosters/psIStillLoveYou.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=-jhSfg4H30g',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 16 created!");
});

//Movie 17
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Action, Thriller',
    title: 'Taken',
    aveScore: 0,
    synopsis: 'A retired CIA agent travels across Europe and relies on his old skills to save his estranged daughter, who has been kidnapped while on a trip to Paris.',
    cast: ['Liam Neeson', 'Maggie Grace', 'Famke Janssen'],
    posterUrl: '/assets/MoviePosters/Taken.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=uPJVJBm9TPA',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 17 created!");
});

//Movie 18
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Horror, Mystery, Thriller',
    title: 'The Conjuring',
    aveScore: 0,
    synopsis: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    cast: ['Patrick Wilson', 'Vera Farmiga', 'Ron Livingston'],
    posterUrl: '/assets/MoviePosters/TheConjuring.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=k10ETZ41q5o',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 18 created!");
});

//Movie 19
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Adventure, Family, Fantasy',
    title: 'Percy Jackson and the Lightning Thief',
    aveScore: 0,
    synopsis: "A teenager discovers he's the descendant of a Greek god and sets out on an adventure to settle an on-going battle between the gods.",
    cast: ['Logan Lerman', 'Kevin McKidd', 'Steve Coogan'],
    posterUrl: '/assets/MoviePosters/PercyJacksonTheLightningThief.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=xko1Mx5w4tg',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 19 created!");
});

//Movie 20
var movieObj = {
    _id: new mongoose.Types.ObjectId(),
    genre: 'Horror',
    title: 'It',
    aveScore: 0,
    synopsis: 'In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.',
    cast: ['Bill Skarsgård', 'Jaeden Martell', 'Finn Wolfhard'],
    posterUrl: '/assets/MoviePosters/it.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=FnCdOQsX5kc',
}
db.insertOne(Movies, movieObj, result=>{
    console.log("Movie 20 created!");
});
