const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TauxIncidenceSchema = new Schema({
    pays: {
        type: String,
        required: true
    },
    week: {
        type: String,
        require: true
    },
    pop: {
        type: Number,
        require: true
    },
    positifs: {
        type: Number,
        required: true
    },
    tauxIncidence: {
        type: Number,
        required: true
    }
});


mongoose.model('tauxdincidence', TauxIncidenceSchema);
const TauxIncidence = mongoose.model('tauxdincidence');
module.exports = TauxIncidence ;
