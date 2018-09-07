import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    userName:String,
    commentData:String
});

const postSchema = new Schema({
    userName:String,
    title:String,
    date:String,
    authorName:String,
    catagory:String,
    postContent:String,
    image:String,
    video:String,
    views:Number,
    likes:Number,
    comment:[commentSchema]
});

const post = mongoose.model('post',postSchema);

module.exports = post;