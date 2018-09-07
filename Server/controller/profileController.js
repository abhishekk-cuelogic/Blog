import profile from '../model/profileModel';


class profileController {

    saveProfile (req,res) {

        let userProfile = {
            userName:req.body.userName,
            fullName:req.body.fullName,
            contact:req.body.contact,
            skills:req.body.skills,
            password:req.body.password,
            profileImage:req.body.profileImage,
            followers:req.body.followers,
            following:req.body.following
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
}

export default new profileController();