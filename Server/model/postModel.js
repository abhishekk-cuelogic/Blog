import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Blog',{ useNewUrlParser: true });
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    userName:String,
    commentData:String,
    date:String
});

const ratingSchema = new Schema({
    userName:String,
    rating:Number
});

const likeSchema = new Schema({
    userName:String
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
    likes:[likeSchema],
    comment:[commentSchema],
    rating:[ratingSchema]
});

const post = mongoose.model('post',postSchema);

module.exports = post;