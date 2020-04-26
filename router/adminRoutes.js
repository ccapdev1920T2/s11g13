const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");
const session_auth = require("../middlewares/session-auth");

router.get('/', session_auth.validAdmin, adminController.getAdminBoard);
router.post('/addMovie',adminController.postMovie);
router.post('/editMovie',adminController.postEditMovie);
router.post('/addShow',adminController.postShow);
router.put('/changeShow',adminController.updateShow);
router.delete('/removeShow',adminController.deleteShow);
router.delete('/removeMovie',adminController.deleteMovie);

// AJAX for admin
router.get('/getDetails', adminController.fetchMovie);

module.exports = router;