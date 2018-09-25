import post from '../model/postModel';
import moment from 'moment';

class searchPostController {

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
       let limit= moment().startOf('day').fromNow().split(' ')[0];
       
       post.find({}, (err,posts) => {
           if(err) {
               res.status(500).send('Internal Server Error');
           } else {
               let recentPosts=posts.filter((doc) => {
               
                        let date=doc.date;
                        let dateObj=moment(date,'MMMM Do YYYY');
                        let diff = dateObj.fromNow();
                        console.log(diff);
                        let string=diff.split(' ');

                        if(string[1] === 'days') {
                            if(string[0] <= 2) {
                                return doc;
                            }
                        }

                        if(string[1] === 'hours') {
                                return doc;                           
                        }
               }) 

               res.json(recentPosts);
           }
       })
    }
}

export default new searchPostController();