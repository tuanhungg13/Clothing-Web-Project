import express from 'express';
const router = express.Router();
import controllers from '../controller/blogCategoryController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create", [verifyAccessToken, isAdmin], controllers.createBlogCategory);
router.get('/', controllers.getAllBlogCategory);
router.put("/update/:bcid", [verifyAccessToken, isAdmin], controllers.updateBlogCategory);
router.delete("/delete/:bcid", [verifyAccessToken, isAdmin], controllers.deleteBlogCategory)


module.exports = router