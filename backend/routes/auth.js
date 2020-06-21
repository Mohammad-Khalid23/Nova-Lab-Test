var express = require('express'),
	router = express.Router(),
	authController = require('../controllers/auth')
	auth = require('../middlewares/authorization');

router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.get('/checkSession',authController.checkSession);

module.exports = router;
