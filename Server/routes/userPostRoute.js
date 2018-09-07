import express from 'express';
import postController from '../controller/postController';

const router = express.Router();

router.get('/',postController.getAllPost);
router.post('/',postController.savePost);
router.put('/view/:id',postController.increaseViewCounter);
router.put('/like/:id',postController.increaseLikeCounnter);
router.put('/comment/:id',postController.addComment);

module.exports = router;



