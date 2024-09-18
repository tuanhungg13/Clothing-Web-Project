const express = require('express');
const router = express.Router();
const controllers = require('../controller/prodCategoryController.js');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.js');

router.post("/create", [verifyAccessToken, isAdmin], controllers.createProductCategory);
router.get('/', controllers.getAllProdCategory);
router.put("/update/:pcid", [verifyAccessToken, isAdmin], controllers.updateProdCategory);
router.delete("/delete/:pcid", [verifyAccessToken, isAdmin], controllers.deleteProdCategory)


module.exports = router