import userActivity from '../model/userActivityModel';
import user from '../model/userModel';

class activityController {

    saveActivity (req,res) {
        userActivity.findOne({userName:req.body.userName},(err,activity) => {
            if(err) {
                res.json(err);
            } else {
                if(activity === null) {
                    let a ={
                        userName : req.body.userName,
                        useractivity : [{
                            activity:req.body.activity
                        }]
                    }
                    let data = new userActivity(a);
                    data.save();
                } else {
                    activity.useractivity.push({activity:req.body.activity});
                    activity.save();
                }
            }
            res.json('done');
        })
    }

    getActivity (req,res) {
        userActivity.findOne({userName:req.params.userName}, (err,doc)=> {
            if(err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })
    }
}

export default new activityController();