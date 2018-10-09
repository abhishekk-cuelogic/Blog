import jwt from 'jsonwebtoken';


   function authentication (req,res,next){
    console.log('Inside auth');
    jwt.verify(req.body.token, 'imsecrete',function(err,decode){
        console.log(req);
        if(err){
            res.json({message:
                "unauthuticate"});
        } else {
            next();
        }
    })
}

module.exports = authentication;