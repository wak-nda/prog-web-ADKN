const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HospitalDataRegionSchema = new Schema({
    dep: {
        type: String,
        required: true
    },
    reg: {
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


mongoose.model('hospitalDataRegion', HospitalDataRegionSchema);
const HospitalDataRegion = mongoose.model('hospitalDataRegion');
module.exports = HospitalDataRegion;

