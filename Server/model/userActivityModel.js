import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activity : String
})

const userActivitySchema = new Schema({
    userName : String,
    useractivity : [activitySchema]
})

const userActivity = mongoose.model('userActivity',userActivitySchema);
module.exports = userActivity;