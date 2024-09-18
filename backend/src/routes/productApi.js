const express = require('express');
const router = express.Router();
const controllers = require('../controller/productController.js');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.js');
const uploader = require("../config/cloudinary.js")



router.post("/create", [verifyAccessToken, isAdmin],
    uploader.fields([
        { name: "option[0][images]", maxCount: 10 },
        { name: "option[1][images]", maxCount: 10 },
        { name: "option[2][images]", maxCount: 10 },
        { name: "option[3][images]", maxCount: 10 }
    ]),
    controllers.createNewProduct);
router.get("/", controllers.getProducts);
router.get("/:slug", controllers.getAProduct);
router.delete("/delete", [verifyAccessToken, isAdmin], controllers.deleteProduct);
router.put("/update", [verifyAccessToken, isAdmin], uploader.fields([
    { name: "option[0][images]", maxCount: 10 },
    { name: "option[1][images]", maxCount: 10 },
    { name: "option[2][images]", maxCount: 10 },
    { name: "option[3][images]", maxCount: 10 }
]), controllers.updateProduct);
router.post("/rating", verifyAccessToken, controllers.ratings);
router.get("/user/getRatingOrder", verifyAccessToken, controllers.getRatingByUser)

module.exports = router