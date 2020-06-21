var express = require('express'),
	router = express.Router(),
	bookingController = require('../controllers/bookings'),
	auth = require('../middlewares/authorization');

router.post('/createBooking',auth.authenticate,bookingController.createBooking);
router.put('/updateBookingStatus/:id',auth.authenticate,bookingController.updateBookingStatus);
router.get('/bookingRequest',auth.authenticate,bookingController.getAllBookingRequest);

module.exports = router;
