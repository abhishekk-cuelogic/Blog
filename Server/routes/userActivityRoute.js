import express from 'express';
import activityController from '../controller/userActivityController';

const router = express.Router();

router.put('/',activityController.saveActivity);
router.get('/:userName',activityController.getActivity);

module.exports = router;
