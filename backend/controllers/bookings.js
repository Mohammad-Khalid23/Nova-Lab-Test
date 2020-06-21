const mongoose = require('mongoose');
const ObjectId =  mongoose.Types.ObjectId;
const BookingModel = require('../models/bookings');
const TimeSlotModel = require('../models/time-slots');
const { checkRequire } = require('../helpers/helper');

module.exports.createBooking = async (req, res) => {
    try {
        let requestData = req.body,
        user = req.user,
        requireFields = ['seller','timeSlot'];
        let result = checkRequire(requestData,requireFields);
        if (!result) {
            //check slot available or not
            let isTimeSlotAvailable = await TimeSlotModel.findOne({ _id : requestData.timeSlot , isAvailable:true});
            if(isTimeSlotAvailable){
                //update slot to unavailable
                let updateAvailaility = await updateTimeSlotAvailability(requestData.timeSlot,false);
                if(updateAvailaility){
                    let data = {
                        buyer: user._id,
                        seller: ObjectId(requestData.seller),
                        timeSlot: ObjectId(requestData.timeSlot)
                    }
                    let response = await new BookingModel(data).save();
                    res.status(200).json({
                        message: 'New Booking Created successfully',
                        data: response
                    })
                }else{
                    console.log('no time availibale')
                }
            } else {
                throw { message: 'Sorry Slot not availabe', code: 409 }
            }
        } else {
            throw result
        }
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports.getAllBookingRequest = async (req, res) => {
    try {
        let bookings = await BookingModel.find({ [req.query.searchby]: req.user._id }).populate([{path:'timeSlot'},{path:'buyer'}]);
        res.status(200).json({
            message: 'Get All Booking Request',
            data: bookings
        })
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}


module.exports.updateBookingStatus = async (req, res) => {
    try {
        let params = req.params;
        if (req.body.status) {
            if(req.body.status === 'rejected' || req.body.status === 'cancelled'){
                let updateAvailaility = updateTimeSlotAvailability(req.body.timeSlot,true);
            }
            let response = await BookingModel.findOneAndUpdate({ _id: params.id }, { status: req.body.status }, { new: true });
            res.status(200).json({
                message: 'Booking has been '+req.body.status,
                data: response
            })
        } else {
            throw { message: 'Status not found', code: 400 }
        }
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}
const updateTimeSlotAvailability = async (timeSlot,status) => {
    let updateAvailaility = await TimeSlotModel.findOneAndUpdate({ _id: timeSlot }, { $set: { isAvailable: status } }, { new: true })
    if(updateAvailaility){
        return updateAvailaility;
    }else {
        throw { message: 'Something went wrong', code: 400 }
    }
}