const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});


mongoose.model('users', UsersSchema);
const Users = mongoose.model('users');
module.exports = Users ;
