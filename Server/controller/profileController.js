import profile from '../model/profileModel';
import multer from 'multer';
import path from 'path';


class profileController {

    saveProfile(req, res) {
        const storage = multer.diskStorage({
            destination: './public/uploads/',
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        });

        const upload = multer({
            storage: storage
        }).single('myImage');


        upload(req, res, (err) => {
            if (err) {
                res.json(err);
            } else {
                console.log(req);
                let profileImage;

                if (req.file === undefined) {
                    console.log('inside undefined');
                    profileImage = 'public/uploads/images.png';
                    profile.findOne({userName: req.body.userName}, (err,doc) =>{
                        if(err) {
                            res.json({
                                message:'Internal Server Error'
                            })
                        } else {
                            if(doc === null) {
                                let p = {
                                    userName : req.body.userName,
                                    fullName : req.body.fullName,
                                    contact : req.body.contact,
                                    skills : req.body.skills,
                                    profileImage : profileImage
                                }

                                let data = new profile(p);
                                data.save();
                            } else {
                                if(doc.profileImage !== 'public/uploads/images.png') {
                                    doc.userName = req.body.userName,
                                    doc.fullName = req.body.fullName,
                                    doc.contact = req.body.contact,
                                    doc.skills = req.body.skills
                                    doc.save();
    
                                } else {
                                    doc.userName = req.body.userName,
                                    doc.fullName = req.body.fullName,
                                    doc.contact = req.body.contact,
                                    doc.skills = req.body.skills,
                                    doc.profileImage = profileImage
                                    doc.save();
                                }                         
                                res.json({
                                    post:doc,
                                    message:'Profile Updated Successfully'
                                })
                            }
                            
                        }
                        
                    })
                } else {
                    profileImage = req.file.path;
                    profile.findOne({userName: req.body.userName}, (err,doc) =>{
                        if(err) {
                            res.json({
                                message:'Internal Server Error'
                            })
                        } else  {
                            doc.userName = req.body.userName,
                            doc.fullName = req.body.fullName,
                            doc.contact = req.body.contact,
                            doc.skills = req.body.skills,
                            doc.profileImage = profileImage
                            doc.save();
                            res.json({
                                post:doc,
                                message:'Profile Updated Successfully'
                            })
                        }
                        
                    })
                }

            }
        })
    }

    getProfile(req, res) {
        console.log(req.params.user);

        profile.findOne({ userName: req.params.user }, (err, profile) => {
            res.json(profile);
        })
    }

    addFollower(req, res) {

        profile.findOne({ userName: req.params.user }, (err, user) => {

            if (err) {
                res.status(500).send("Internal Server Error")
            }

            user.followers.push({ userName: req.body.userName });
            user.save();
        })

        profile.findOne({ userName: req.body.userName }, (err, user) => {

            if (err) {
                res.status(500).send("Internal Server Error")
            }

            user.following.push({ userName: req.params.user });
            user.save();
        })

        res.send("following");
    }

    getFollowers(req, res) {

        profile.findOne({ userName: req.params.user }, (err, user) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            }

            res.json(user.followers);
        })
    }

    getFollowings(req, res) {

        profile.findOne({ userName: req.params.user }, (err, user) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            }
            console.log(user);

            if(user === null) {
                res.json(null);
            } else  {
                res.json(user.following);
            }
            
        })
    }
   
    getAllProfile (req,res) {
        profile.find({},(err,docs) => {
            if(err) {
                res.json(err);
            }else{
                res.json(docs);
            }
        })
    }

    addFeedBack (req,res) {
        profile.findOne({ userName: req.params.user }, (err, user) => {

            if (err) {
                res.status(500).send("Internal Server Error")
            }

            user.feedback.push({ userName: req.body.userName ,feed:req.body.feed});
            user.save();
            res.json('feedback saved successfully');
        })
    }

    addMessage (req,res) {
        profile.findOne({ userName: req.params.user }, (err, user) => {

            if (err) {
                res.status(500).send("Internal Server Error")
            }

            user.message.push({ userName: req.body.userName ,msg:req.body.msg});
            user.save();
            res.json('message saved successfully');
        })
    }

    getMessage (req,res) {
        profile.findOne({ userName: req.params.user }, (err, user) => {

            if (err) {
                res.status(500).send("Internal Server Error")
            }

            res.json(user.message);
        })
    }
}

export default new profileController();




