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
                } else {
                    profileImage = req.file.path;
                }

                profile.findOne({ userName: req.body.userName }, (err, doc) => {
                    if (err => {
                        res.json({
                            message: err
                        })
                    })

                        console.log('doc=====>',doc);

                        if (doc === null) {

                            let userData = {
                                userName : req.body.userName,
                                fullName : req.body.fullName,
                                contact : req.body.contact,
                                skills : req.body.skills,
                                profileImage : profileImage
                            }
                            let data = new profile(userData)
                            data.save();
                        } 

                        if(doc !== null) {
                            console.log('notnull',doc.profileImage);
                            console.log(profileImage);
                            if( doc.profileImage !== 'public/uploads/images.png') {
                                doc.userName = req.body.userName,
                                doc.fullName = req.body.fullName,
                                doc.contact = req.body.contact,
                                doc.skills = req.body.skills
                                doc.save();
                            } 
                            if(doc.profileImage === 'public/uploads/images.png') {
                                doc.userName = req.body.userName,
                                doc.fullName = req.body.fullName,
                                doc.contact = req.body.contact,
                                doc.skills = req.body.skills,
                                doc.profileImage = profileImage
                                doc.save();
                            }
                            
                        }
                })
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

            res.json(user.following);
        })
    }
}

export default new profileController();




