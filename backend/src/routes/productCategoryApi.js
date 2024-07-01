import express from 'express';
const router = express.Router();
import controllers from '../controller/prodCategoryController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create", [verifyAccessToken, isAdmin], controllers.createProductCategory);
router.get('/', controllers.getAllProdCategory);
router.put("/update/:pcid", [verifyAccessToken, isAdmin], controllers.updateProdCategory);
router.delete("/delete/:pcid", [verifyAccessToken, isAdmin], controllers.deleteProdCategory)


module.exports = router