import express from 'express';
import profileController from '../controller/profileController';

const router = express.Router();

router.get('/:user',profileController.getProfile);
router.post('/',profileController.saveProfile);
router.get('/follower/:user',profileController.getFollowers);
router.put('/follower/:user',profileController.addFollower);
router.get('/following/:user',profileController.getFollowings);
router.get('/',profileController.getAllProfile);
router.post('/feedback/:user',profileController.addFeedBack);


module.exports = router;