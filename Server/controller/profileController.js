import profile from '../model/profileModel';
import multer from 'multer';
import path from 'path';


class profileController {

    saveProfile (req,res) {


        const storage = multer.diskStorage({
            destination:'./public/uploads/',
            filename:function(req,file,cb){
                cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname) )
            }
        });
        
        const upload = multer ({
            storage: storage
        }).single('myImage');


        upload(req,res,(err) => {
            if(err) {
                res.json(err);
            } else {
               console.log(req);

               let userProfile = {
                userName:req.body.userName,
                fullName:req.body.fullName,
                contact:req.body.contact,
                skills:req.body.skills,
                profileImage:req.file.path
            }

                let data = new profile(userProfile);
                data.save();
                res.send("Profile Saved Successfully");
            }
        })

       

        
    }

    getProfile (req,res) {
        console.log(req.params.user);

        profile.findOne({userName:req.params.user},(err,profile) => {
            res.json(profile);
        })
    }

    addFollower (req,res) {

        profile.findOne({userName:req.params.user}, (err,user) => {

            if(err) {
                res.status(500).send("Internal Server Error")
            }

            user.followers.push({userName:req.body.userName});
            user.save();
        })

        profile.findOne({userName:req.body.userName}, (err,user) => {

            if(err) {
                res.status(500).send("Internal Server Error")
            }

            user.following.push({userName:req.params.user});
            user.save();
        })

        res.send("following");
    }

    getFollowers (req,res) {

        profile.findOne({userName:req.params.user}, (err,user) => {
            if(err) {
                res.status(500).send("Internal Server Error");
            }

            res.json(user.followers);
        })
    }

    getFollowings (req,res) {

        profile.findOne({userName:req.params.user}, (err,user) => {
            if(err) {
                res.status(500).send("Internal Server Error");
            }

            res.json(user.following);
        })
    }
}

export default new profileController();