const express = require('express');
const router = express.Router();
const controllers = require('../controller/blogController.js');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.js');
const uploaderBlog = require("../config/cloudinaryBlog.js")
router.post("/create", [verifyAccessToken, isAdmin], uploaderBlog.single("image"), controllers.createNewBlog);
router.get('/', controllers.getBlogs);
router.put("/update/:bid", [verifyAccessToken, isAdmin], uploaderBlog.single("image"), controllers.updateBlog);
router.delete("/delete/:bid", [verifyAccessToken, isAdmin], controllers.deleteBlog)
router.get("/:bid", controllers.getBlog)

module.exports = router