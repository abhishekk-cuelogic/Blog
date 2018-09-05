import bcrypt from 'bcrypt';
import user from '../model/userModel';



class userController {

    signUp  (req,res)  {

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
}

export default new userController();