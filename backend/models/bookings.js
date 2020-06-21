const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookings = new Schema({
    timeSlot: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'TimeSlots'
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','accepted','rejected','cancelled']
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
module.exports = mongoose.model('Bookings', bookings);