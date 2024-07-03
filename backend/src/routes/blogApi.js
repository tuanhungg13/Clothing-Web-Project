import express from 'express';
const router = express.Router();
import controllers from '../controller/blogController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create", [verifyAccessToken, isAdmin], controllers.createNewBlog);
router.get('/', controllers.getBlogs);
router.put("/update/:bid", [verifyAccessToken, isAdmin], controllers.updateBlog);
router.delete("/delete/:bid", [verifyAccessToken, isAdmin], controllers.deleteBlog)
router.put("/like/:bid", [verifyAccessToken], controllers.likeBlog);
router.get("/:bid", controllers.getBlog)

module.exports = router