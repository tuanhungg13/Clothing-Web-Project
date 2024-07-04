import express from 'express';
const router = express.Router();
import controllers from '../controller/couponController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create", [verifyAccessToken, isAdmin], controllers.createNewCoupon);
router.get('/', controllers.getCoupons);
router.put("/update/:cid", [verifyAccessToken, isAdmin], controllers.updateCoupon);
router.delete("/delete/:cid", [verifyAccessToken, isAdmin], controllers.deleteCoupon)
router.get("/:cid", controllers.getACoupon)

module.exports = router