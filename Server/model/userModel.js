import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{type:String , unique:true },
    passWord:String,
    forgotToken:String
});

const user = mongoose.model('user',userSchema);

module.exports = user;

