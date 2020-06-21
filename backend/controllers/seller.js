const User = require('../models/user');
const TimeSlotModel = require('../models/time-slots');

module.exports.getAllSellers = async (req, res) => {
    try {
        let query = req.query,
        searchQuery = {
            role: 'seller'
        }
        if(query.searchText){
            searchQuery = {
                ...searchQuery,
                firstName: { 
                            $regex: query.searchText,
                            $options: 'i'} 
                }
        }
        let sellers = await User.find(searchQuery, { password: 0, access_token: 0 });
        res.status(200).json({
            message: 'Get All Sellers',
            data: sellers
        })
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}


module.exports.getSellerDetails = async (req, res) => {
    try {
        let params = req.params;
        let sellers = await User.findOne({_id:req.user.id}, { password: 0,access_token:0 });
        res.status(200).json({
            message: 'Get Seller Details',
            data: sellers
        })
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}


module.exports.addTimeSlot = async (req, res) => {
    try {
        let requestData = req.body,
        user = req.user;
            let data = {
                startTime: new Date(requestData.startTime),
                endTime: new Date(requestData.endTime),
                seller: user._id
            }
            let response = await new TimeSlotModel(data).save();
            res.status(200).json({
                message: 'New Time slot added successfully',
                data: response
            })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
        })
    }
}


module.exports.getAllTimeSlots = async (req, res) => {
    try {
        let timeSlots = await TimeSlotModel.find({ seller: req.params.id }).sort({ created_at: 1 });
        res.status(200).json({
            message: 'Get all time slots',
            data: timeSlots
        })
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}