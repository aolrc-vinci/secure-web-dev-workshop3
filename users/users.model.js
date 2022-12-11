const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_ROOT_URI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,        // username must be unique
    },
    password: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;