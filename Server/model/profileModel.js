import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userName:String,
    fullName:String,
    contact:String,
    skills:String,
    passWord:String,
    profileImage:String,
    followers:Number,
    following:Number
})

const profile = mongoose.model('profile',profileSchema);

module.exports = profile;