//Insert db model dependencies here



//Functions for adminController
const adminController = {
    getAdminBoard: function(req, res, next) {
        /*
            VARIABLES:
            show = title, genre, rating, day, date, time
                = list of showing movies this week
            
            FORM: New Movie
            movTitle = 
            movGenre =
            movScore =
            movSynopsis =
            movCast =
    
            FORM: New Show
            movieID = 
            date = 
            time = 
        */
        
        res.render('admin', {
            pageName: "Admin Dashboard",
            isSignedIn: true,
            username: "Bh0sZxCArr3n",
            movies:[
                {title: "To All The Boys P.S. I Still Love You", movie_id:23},
                {title: "The Lightning Thief", movie_id:101},
                {title: "Ice Age", movie_id:103},
                {title: "The Conjuring", movie_id: 156},
                {title: "It", movie_id: 256},
                {title: "Taken", movie_id: 269},
                {title: "Avengers: Civil War", movie_id: 298},
                {title: "Captain America: The Winter Soldier", movie_id: 302},
                {title: "Doctor Who - The Day of the Doctor", movie_id: 307},
            ],
            show: [
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                {title: 'MovieMysteryAdventure', genre: 'Mystery, Adventure', rating: '3', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                {title: 'MovieMysteryAdventure', genre: 'Mystery, Adventure', rating: '3', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 4, date: '04-15-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 5, date: '04-16-20', time: '12:45 - 14:15'},
                {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 6, date: '04-17-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 6, date: '04-17-20', time: '12:45 - 14:15'},
                {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 7, date: '04-18-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 7, date: '04-18-20', time: '12:45 - 14:15'},
            ],
        })
    },
}

module.exports = adminController;