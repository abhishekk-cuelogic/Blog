import express from 'express';
import profileController from '../controller/profileController';

const router = express.Router();

router.get('/:user',profileController.getProfile);
router.post('/',profileController.saveProfile);
router.get('/follower/:user',profileController.getFollowers);
router.put('/follower/:user',profileController.addFollower);
router.get('/following/:user',profileController.getFollowings);


module.exports = router;