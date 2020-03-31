//Insert db model dependencies here



//Functions for userController
const registerController = {
    getRegister: function(req, res, next){
        res.render("register", {
            pageName: "Register",
        })
    },

    postRegister: (req, res, next)=>{
        let {
            regFName,
            regLName,
            regUName,
            regEmail,
            regPhone,
        } = req.body;
        
        let retrievedData = {
            pageName: "User Profile",
            isSignedIn: true,
            fname: regFName,
            lname: regLName,
            username: regUName,
            email: regEmail,
            phone: regPhone,
        };

        console.log(retrievedData);
        res.render("userprofile", retrievedData);
    },
}

module.exports = registerController;