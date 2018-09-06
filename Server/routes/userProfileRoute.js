import express from 'express';
import profileController from '../controller/profileController';

const router = express.Router();

router.get('/:user',profileController.getProfile);
router.post('/',profileController.saveProfile);

module.exports = router;