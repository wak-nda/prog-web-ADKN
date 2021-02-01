const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CustomerAccountSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    cardId: {
        type: String,
        require: true
    },
    fireBaseIdMobile: {
        type: String,
        require: true
    },
    endpoint: {
        type: String,
        require: true
    },
    p256dh : {
        type: String,
        require: true
    },
    auth: {
        type: String,
        require: true
    }
});


mongoose.model('customeraccount', CustomerAccountSchema);
const CustomerAccount = mongoose.model('customeraccount');

module.exports = CustomerAccount;
