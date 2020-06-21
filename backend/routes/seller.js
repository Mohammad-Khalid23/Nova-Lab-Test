var express = require('express'),
	router = express.Router(),
	sellerController = require('../controllers/seller'),
	auth = require('../middlewares/authorization');

router.get('/',auth.authenticate,sellerController.getAllSellers);
router.get('/sellerDetails',auth.authenticate,sellerController.getSellerDetails);
router.post('/timeSlot',auth.authenticate,sellerController.addTimeSlot);
router.get('/timeSlots/:id',auth.authenticate,sellerController.getAllTimeSlots);

module.exports = router;
