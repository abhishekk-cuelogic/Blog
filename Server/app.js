import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

import userRouter from './routes/userRoute';

app.use('/',userRouter);

app.listen(3000);

console.log('Server started on port 3000');