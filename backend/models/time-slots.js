const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeSlots = new Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
module.exports = mongoose.model('TimeSlots', timeSlots);