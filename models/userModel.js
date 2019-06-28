const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String, 
    password: String, 
    tasks:[{
        type: Schema.Types.ObjectId, 
        ref: 'task'
    }]
})

const User= mongoose.model('user', userSchema)
module.exports = User;