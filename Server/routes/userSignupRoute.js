import express from 'express';
import userController from '../controller/userController';
const router = express.Router();
import authentication from '../middleware/authentication';

router.post('/',userController.signUp);
router.delete('/:userName',authentication,userController.deleteUser);

module.exports = router;
