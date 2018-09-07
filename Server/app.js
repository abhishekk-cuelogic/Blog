import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

import userSignupRouter from './routes/userSignupRoute';
import userSigninRouter from './routes/userSigninRoute';
import userProfileRouter from './routes/userProfileRoute';

app.use('/',userSignupRouter);
app.use('/signin',userSigninRouter);
app.use('/profile',userProfileRouter);

app.listen(3000);

console.log('Server started on port 3000');