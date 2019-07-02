const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title: String, 
        description: String, 
        duedate: Date,
        owner:{
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    }
)

const Task= mongoose.model('task', taskSchema)
module.exports = Task;