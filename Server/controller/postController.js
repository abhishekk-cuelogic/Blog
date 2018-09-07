import post from '../model/postModel';

class postController {

    savePost (req,res) {

        let postData = {
            userName:req.body.userName,
            title:req.body.title,
            date:req.body.date,
            authorName:req.body.authorName,
            catagory:req.body.catagory,
            postContent:req.body.postContent,
            image:req.body.image,
            video:req.body.video,
            views:req.body.views,
            likes:req.body.likes
        }

        let data = new post(postData);
        data.save();
        res.send("Post saved successfully");
    }

    getAllPost (req,res) {
        post.find({},(err,posts) => {
            res.json(posts);
        })
    }

    increaseViewCounter (req,res) {
        post.findOne({_id:req.params.id}, (err,post) => {
            post.views = post.views + 1;
            post.save();
            res.send(post);
        })
    }

    increaseLikeCounnter (req,res) {
        post.findOne({_id:req.params.id}, (err,post) => {
            post.likes = post.likes + 1;
            post.save();
            res.send(post);
        })
    }

    addComment (req,res) {
        post.findOne({_id:req.params.id} , (err,post) => {
            post.comment.push({userName:req.body.userName,commentData:req.body.commentData});
            post.save();
            res.send(post);
        })
    }
}

export default new postController();