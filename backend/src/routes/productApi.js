import express from 'express';
const router = express.Router();
import controllers from '../controller/productController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';
import uploader from "../config/cloudinary"

router.post("/create", [verifyAccessToken, isAdmin], controllers.createNewProduct);
router.get("/", controllers.getProducts);
router.delete("/delete/:pid", [verifyAccessToken, isAdmin], controllers.deleteProduct);
router.put("/update/:pid", [verifyAccessToken, isAdmin], controllers.updateProduct);
router.put("/uploadImage/:pid", [verifyAccessToken, isAdmin], uploader.single("images"), controllers.uploadImageProduct)
router.post("/rating", verifyAccessToken, controllers.ratings);
module.exports = router