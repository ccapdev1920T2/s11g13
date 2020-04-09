const authenticator = {
    rlActiveSession: (req, res, next) =>{
        if (req.session.userId){
            User.find({token: req.session.userId})
                .then(user=>{
                    console.log('userfound');
                    return res.redirect('user/'+ user[0].username);
                })
        }else{
            return next();
        }
    },
    
    validUser: (req, res, next) =>{
        if (req.session.userId){
            User.find({token: req.session.userId})
                .then(user=>{
                    if (user[0].username == req.params.username){
                        if (user[0].userType == "User"){
                            return next();
                        } else {
                            res.redirect('/admin');
                        }
                    } else {
                        return res.redirect('/user/'+ user[0].username);
                    }
                })
        }else{
            return res.redirect('/login');
        }
    },
    
    validAdmin: (req, res, next) =>{
        if (req.session.userId){
            User.find({token: req.session.userId})
                .then(user=>{
                    if (user[0].userType == "Admin"){
                        return next();
                    } else {
                        return res.redirect('user/'+ user[0].username);
                    }
                })
        }else{
            return res.redirect('/login');
        }
    },
    
    logout: (req, res, next) =>{
        req.session.destroy(err => {
            if(err){
                return res.redirect('/home');
            }
                res.redirect('/home');
        })
    }
}

module.exports =  authenticator