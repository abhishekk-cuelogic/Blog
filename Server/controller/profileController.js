import profile from '../model/profileModel';


class profileController {

    saveProfile (req,res) {

        let userProfile = {
            userName:req.body.userName,
            fullName:req.body.fullName,
            contact:req.body.contact,
            skills:req.body.skills,
            password:req.body.password,
            profileImage:req.body.profileImage
        }

        let data = new profile(userProfile);
        data.save();
        res.send("Profile Saved Successfully");
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