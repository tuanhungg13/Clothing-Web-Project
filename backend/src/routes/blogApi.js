import express from 'express';
const router = express.Router();
import controllers from '../controller/blogController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';
import uploaderBlog from "../config/cloudinaryBlog"
router.post("/create", [verifyAccessToken, isAdmin], uploaderBlog.single("image"), controllers.createNewBlog);
router.get('/', controllers.getBlogs);
router.put("/update/:bid", [verifyAccessToken, isAdmin], uploaderBlog.single("image"), controllers.updateBlog);
router.delete("/delete/:bid", [verifyAccessToken, isAdmin], controllers.deleteBlog)
router.get("/:bid", controllers.getBlog)

module.exports = router