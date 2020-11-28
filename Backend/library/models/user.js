const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName:   {
        type: String
    },
    TelephoneNumber:  {
        type: String
    },
    FullAddress:  {
        type: String
    },
    SSN: {
        type: String
    }
});

const User = mongoose.model('user',UserSchema);

module.exports = User;
