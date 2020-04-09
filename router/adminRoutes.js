const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");

///this path is to '/admin'
router.get('/', adminController.getAdminBoard);
router.post('/addMovie',adminController.postMovie);
router.post('/addShow',adminController.postShow);
router.put('/changeShow',adminController.updateShow);
router.delete('/removeShow',adminController.deleteShow);

module.exports = router;