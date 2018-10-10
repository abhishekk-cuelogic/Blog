import post from '../model/postModel';
import moment from 'moment';
import multer from 'multer';
import path from 'path';

class postController {

    savePost (req,res) {

        const storage = multer.diskStorage({
            destination:'./public/uploads/',
            filename:function(req,file,cb){
                cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname) )
            }
        });
        
        const upload = multer ({
            storage: storage
        }).any('myImage');
        
        upload(req,res,(err) => {
            if(err) {
                res.json(err);
            } else {
                let videopath = '';
                if(req.files[1]) {
                    videopath = req.files[1].path
                }

                let postData = {
                    userName:req.body.userName,
                    title:req.body.title,
                    date:moment().format('MMMM Do YYYY'),
                    authorName:req.body.authorName,
                    catagory:req.body.catagory,
                    postContent:req.body.content,
                    image:req.files[0].path,
                    video:videopath,
                    views:0
                }

                let data = new post(postData);
                data.save();
                res.json('Blog saved successfully!!');
            }
        })

        
    }

    updatePost (req,res) {
        post.findOneAndUpdate({_id:req.params.postId}, req.body ,{new:true}, (err,post) => {
            if(err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.json('Post successfully Updated');
            }
        })
    }

    deletePost (req,res) {
        post.findOneAndRemove({_id:req.params.postId}, (err,post) => {
            if(err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.json("Post Deleted Successfully")
            }
        })
    }

    getPost (req,res) {
        post.findOne({_id:req.params.postId},(err,post) => {
            if(err) {
                res.json(err);
            } else {
                res.json(post);
            }      
        })
    }

    getAllPost (req,res) {
        post.find({},(err,posts) => {
            res.json(posts);
        })
    }

    getUserAllPost (req,res) {
        post.find({userName:req.params.userName},(err,posts) => {
            res.json(posts);
        })
    }

    increaseViewCounter (req,res) {
        post.findOne({_id:req.params.postId}, (err,post) => {
            post.views = post.views + 1;
            post.save();
            res.send(post);
        })
    }

    increaseLikeCounter (req,res) {
        post.findOne({_id:req.params.postId}, (err,post) => {
            post.likes.push({userName:req.body.userName})
            post.save();
            res.send(post);
        })
    }

    addComment (req,res) {
        post.findOne({_id:req.params.postId} , (err,post) => {
            post.comment.push({userName:req.body.userName,commentData:req.body.commentData,date:moment().format('MMMM Do YYYY, h:mm:ss a')});
            post.save();
            res.send(post);
        })
    }

    addRating (req,res) {
        post.findOne({_id:req.params.postId} , (err,post) => {
            post.rating.push({userName:req.body.userName, rating:req.body.ratingData});
            post.save();
            res.send(post);
        })
    }

    getAverageRating (req,res) {
        post.findOne({_id:req.params.postId} , (err,post) => {
            let sum=0;
            let ratings = post.rating;

            for (let i=0;i<ratings.length;i++) {
                sum = sum+ratings[i].rating;
            }

            let average = sum / ratings.length;
            res.json(average);
           
        })
    }

    getPopularPost (req,res) {
        post.find({}).sort({views:-1}).limit(4).exec( (err,posts) => {
            if(err) {
                res.status(500).send('Internal Server Error');
            } else {
                res.json(posts);
            }
        })
    }

    getLikes (req,res) {
        post.findOne({_id:req.params.postId}, (err,post) => {
            res.json(post.likes)
        })
    }

    getRating (req,res) {
        post.findOne({_id:req.params.postId} , (err,post) => {
            res.json(post.rating);
        })
    }

    deleteComment (req,res) {
       post.findOne({_id:req.params.postId},(err,post) => {
           if(err){
                res.json(err);
           }else{
            post.comment.forEach(obj => {
                if(obj._id == req.params.cid){
                    obj.remove();
                }
            })
            post.save();
            res.json('comment deleted successfully');
           }          
       })
    }
}

export default new postController();