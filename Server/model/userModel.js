import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:String,
    passWord:String
});

const user = mongoose.model('user',userSchema);

module.exports = user;
