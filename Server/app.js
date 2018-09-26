import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

import userSignupRouter from './routes/userSignupRoute';
import userSigninRouter from './routes/userSigninRoute';
import userProfileRouter from './routes/userProfileRoute';
import userPostRouter from './routes/userPostRoute';

app.use('/',userSignupRouter);
app.use('/signin',userSigninRouter);
app.use('/profile',userProfileRouter);
app.use('/post',userPostRouter);

app.get('/public/uploads/:id',function(req,res){
    res.sendFile(path.join(__dirname+'/public/uploads/'+req.params.id));
 })
 

app.listen(2700);

console.log('Server started on port 2700');
