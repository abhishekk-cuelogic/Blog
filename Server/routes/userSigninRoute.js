import express from 'express';
import userController from '../controller/userController';
const router = express.Router();

router.post('/',userController.signIn);
router.post('/forgotpassword',userController.forgotPassword);

module.exports = router;