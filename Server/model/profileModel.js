import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    userName:String
});

const followingSchema = new Schema({
    userName:String
})

const profileSchema = new Schema({
    userName:String,
    fullName:String,
    contact:String,
    skills:String,
    passWord:String,
    profileImage:String,
    followers:[followerSchema],
    following:[followingSchema]
})

const profile = mongoose.model('profile',profileSchema);

module.exports = profile;