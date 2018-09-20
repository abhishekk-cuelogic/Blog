import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../model/userModel';

const secretekey = 'imsecrete';



class userController {

    signUp (req,res) {

        let passWord = req.body.password;
        let hash = bcrypt.hashSync(passWord,10);

        let userDetail = {
            userName:req.body.username,
            passWord:hash
        }

        let data = new user(userDetail);
        data.save();
        res.send("signUp Successful");

    }

    signIn (req,res) {

        user.findOne({userName : req.body.username}, (err,user) => {
            if(err) {
                res.status(500).send("Internal Server Error");
            } else{
                if(user === null) {
                    res.json({
                        message:'Not valid UserName'
                    });
                }
                else{
                    if(bcrypt.compareSync(req.body.password , user.passWord)){

                        let token = jwt.sign({
                            username : req.body.username
                        },
                        secretekey,
                        {
                            expiresIn:'2h'
                        });

                        res.json({
                            message:'login successful!!!',
                            token:token,
                            username:req.body.username
                        })
                    } else {
                        res.json({
                            message:'Wrong Password'
                        });
                    }
                }
                
            }
            
        })
    }
}

export default new userController();