var express = require('express'),
	router = express.Router(),
	userController = require('../controllers/user')
	// auth = require('../middlewares/authorization');

router.get('/:id',userController.getUserDetail);
router.put('/:id',userController.updateUserDetail);

module.exports = router;
