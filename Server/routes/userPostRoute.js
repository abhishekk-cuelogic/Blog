import express from 'express';
import postController from '../controller/postController';
import searchPostController from '../controller/searchPostController';
import authentication from '../middleware/authentication';

const router = express.Router();

router.get('/',postController.getAllPost);
router.get('/getone/:postId',postController.getPost);
router.post('/',postController.savePost);
router.put('/:postId',authentication,postController.updatePost);
router.delete('/:postId',authentication,postController.deletePost);
router.put('/view/:postId',postController.increaseViewCounter);
router.put('/like/:postId',authentication,postController.increaseLikeCounter);
router.get('/like/:postId',postController.getLikes);
router.put('/comment/:postId',authentication,postController.addComment);
router.put('/comment/:postId/:cid',authentication,postController.deleteComment);
router.put('/rating/:postId',authentication,postController.addRating);
router.get('/rating/all/:postId',postController.getRating);
router.get('/rating/:postId',postController.getAverageRating);
router.get('/popular',postController.getPopularPost);
router.get('/recent',searchPostController.getRecentPost);
router.get('/yml',searchPostController.getYML);
router.get('/year/:year',searchPostController.getPostByYear);
router.get('/catagory/:catagory',searchPostController.getPostByCatagory);
router.get('/id/:postId',searchPostController.getPostById);
router.get('/getallpost/:userName',postController.getUserAllPost);

module.exports = router;



