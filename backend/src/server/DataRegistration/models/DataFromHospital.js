const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DataFromHospitalSchema = new Schema({
    dep: {
        type: String,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    jour: {
        type: String,
        require: true
    },
    hosp: {
        type: Number,
        require: true
    },
    rea: {
        type: Number,
        require: true
    },
    rad: {
        type: Number,
        require: true
    },
    dc: {
        type: Number,
        require: true
    }
});


mongoose.model('datafromhospital', DataFromHospitalSchema);
const DataFromHospital = mongoose.model('datafromhospital');
module.exports = DataFromHospital;

