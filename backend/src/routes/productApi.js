import express from 'express';
const router = express.Router();
import controllers from '../controller/productController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create-product", [verifyAccessToken, isAdmin], controllers.createNewProduct);
router.get("/all-products", controllers.getAllProducts);
router.delete("/delete-product/:pid", [verifyAccessToken, isAdmin], controllers.deleteProduct);
router.put("/update-product/:pid", [verifyAccessToken, isAdmin], controllers.updateProduct);

module.exports = router