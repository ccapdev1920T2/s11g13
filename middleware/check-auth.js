const jwt = require('jsonwebtoken');
// path to use this checkAuth:
// const checkAuth = require('../middleware/heck-auth');

module.exports = (req, res, next) => {
    //we should failed if we got no token //wow
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error){
        return res.status(401).json({
            message: 'huh'
        });
    }
};