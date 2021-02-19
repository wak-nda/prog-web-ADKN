const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Period = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        require: true
    }
});


mongoose.model('period', Period);
const PeriodSchema = mongoose.model('period');
module.exports = PeriodSchema ;
