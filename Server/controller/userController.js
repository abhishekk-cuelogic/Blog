import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../model/userModel';
import nodemailer from 'nodemailer';
import UIDGenerator from 'uid-generator';

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
        data.save(error => {
            if(error) {
                if (error.code === 11000) {
                    res.send('username alredy avaliable');
                }
            }else {
                res.send('signup successful!!!');
            }
        });
    }

    signIn (req,res) {

        user.findOne({userName : req.body.username}, (err,user) => {
            if(err) {
                res.status(500).send("Internal Server Error");
            } else{
                if(user === null) {
                    res.json({
                        message:false
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
                            message:true,
                            token:token,
                            username:req.body.username
                        })
                    } else {
                        res.json({
                            message:false
                        });
                    }
                }
                
            }
            
        })
    }

    forgotPassword (req,res) {
        console.log("forgetpassword hit");

        const uidgen = new UIDGenerator();
        let token = uidgen.generateSync();

        user.findOne({userName:req.body.email}, (err,user)=> {
            if(err) {
                res.json({
                    message:"Internal Server Error"
                })
            } else {
                if(user === null) {
                    res.json({
                        message:"UserName not avialable in Database"
                    })
                } else {

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'abhishek.khutwad@cuelogic.com',
                        pass: 'cuelogicpassword'
                        }
                        });

                        let mailOptions = {
                            from: '"Abhishek Khutwad" <abhishek.khutwad@cuelogic.com>', // sender address
                            to: req.body.email, // list of receivers
                            subject: ' Reset Your Password', // Subject line
                            text: '', // plain text body
                            html: `<b>reset your password at this <a href='http://localhost:3000/changepassword/${token}'>link</a> </b>` // html body
                            };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });

                    res.json({
                        message : true,
                        token: token
                    })
                    
                }
            }
        })
    }
}

export default new userController();