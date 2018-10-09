import express from 'express';
import userController from '../controller/userController';
const router = express.Router();

router.post('/',userController.signUp);
router.delete('/:userName',userController.deleteUser);

module.exports = router;
