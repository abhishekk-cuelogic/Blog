import express from 'express';
import postController from '../controller/postController';
import searchPostController from '../controller/searchPostController';

const router = express.Router();

router.get('/',postController.getAllPost);
router.post('/',postController.savePost);
router.put('/:postId',postController.updatePost);
router.delete('/:postId',postController.deletePost);
router.put('/view/:postId',postController.increaseViewCounter);
router.put('/like/:postId',postController.increaseLikeCounter);
router.get('/like/:postId',postController.getLikes);
router.put('/comment/:postId',postController.addComment);
router.put('/rating/:postId',postController.addRating);
router.get('/rating/:postId',postController.getAverageRating);
router.get('/popular',postController.getPopularPost);
router.get('/recent',searchPostController.getRecentPost);
router.get('/yml',searchPostController.getYML);
router.get('/year/:year',searchPostController.getPostByYear);
router.get('/catagory/:catagory',searchPostController.getPostByCatagory);
router.get('/id/:postId',searchPostController.getPostById);

module.exports = router;



