import express from 'express';
const router = express.Router();
import controllers from '../controller/productController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';
import uploader from "../config/cloudinary"



router.post("/create", [verifyAccessToken, isAdmin],
    uploader.fields([
        { name: "options[0][images]", maxCount: 10 },
        { name: "options[1][images]", maxCount: 10 },
        { name: "options[2][images]", maxCount: 10 },
        { name: "options[2][images]", maxCount: 10 }
    ]),
    controllers.createNewProduct);
router.get("/", controllers.getProducts);
router.get("/:slug", controllers.getAProduct);
router.delete("/delete/:pid", [verifyAccessToken, isAdmin], controllers.deleteProduct);
router.put("/update/:pid/", [verifyAccessToken, isAdmin], controllers.updateProduct);
router.post("/rating", verifyAccessToken, controllers.ratings);
module.exports = router