import post from '../model/postModel';
import moment from 'moment';

class searchPostController {


    getPostById (req,res) {
        post.findOne({_id:req.params.postId} , (err,post) => {
            if(err) {
                res.json('no such post');
            } else {
                res.json(post);
            }
        })
    }

    getPostByYear (req,res) {
        post.find({}, (err,posts) => {

            if(err) {
                res.status(500).send('Internal Server Error');
            } else {
                let yearPosts= posts.filter((doc)=>{
                    let year= doc.date.split(' ')[2];
   
                    if(year === req.params.year) {
                        return doc;
                    } 
               })
               res.json(yearPosts);
            }   
        })
    }

    getPostByCatagory (req,res) {
        post.find({}, (err,posts) => {
            if(err) {
                res.status(500).send('Internal Server Error');
            } else {
                let catagoryPosts = posts.filter((doc) => {
                    let catagory = doc.catagory.toLowerCase();

                    if(catagory === req.params.catagory.toLowerCase()) {

                        return doc;
                    }
                })

                res.json(catagoryPosts);
            }
        })
    }

    getRecentPost (req,res) { 
       post.find({}, (err,posts) => {
           if(err) {
               res.status(500).send('Internal Server Error');
           } else {
               let recentPosts = posts.slice(-4);
               res.json(recentPosts);
           }
       })
    }
}

export default new searchPostController();