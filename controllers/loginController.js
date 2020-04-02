

const loginController = {
        //Render login page
        getLogin: function(req, res, next){
            res.render("login", {
                pageName: "Log In",
                
            })
        },
    
        postLogin: (req, res, next)=>{
            let {
                username,
            } = req.body;
    
            let retrievedData = {};
    
            if(username=="jhcagaoan"){
                retrievedData = {
                    pageName: "User Profile",
                    isSignedIn: true,
                    pic: "/assets/profpic.png",
                    fname: "John Henry",
                    lname: "Cagaoan",
                    username,
                    email: "john_henry_cagaoan@dlsu.edu.ph",
                    phone: "09273667542",
                }
                // next("/userprofile/" + username, retrievedData);
            }
            else if(username=="biancarb"){
                retrievedData = {
                    pageName: "User Profile",
                    isSignedIn: true,
                    pic: "/assets/profpic.png",
                    fname: "Bianca Joy",
                    lname: "Benedictos",
                    username,
                    email: "bianca_benedictos@dlsu.edu.ph",
                    phone: "09123456789",
                }
                // next("/userprofile/" + username, retrievedData);
            }
            else if(username=="howardg"){
                retrievedData = {
                    pageName: "User Profile",
                    isSignedIn: true,
                    pic: "/assets/profpic.png",
                    fname: "Howard",
                    lname: "Montecillo",
                    username: "howardg",
                    email: "howard_montecillo@dlsu.edu.ph",
                    phone: "09876543210",
                }
                // next("/userprofile/" + username, retrievedData);
            }
    
            res.render("userprofile", retrievedData);
        },
}

module.exports = loginController;