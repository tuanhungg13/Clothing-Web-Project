const express = require('express');
const router = express.Router();
const controllers = require('../controller/couponController.js');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.js');

router.post("/create", [verifyAccessToken, isAdmin], controllers.createNewCoupon);
router.get('/', controllers.getCoupons);
router.put("/update/:cid", [verifyAccessToken, isAdmin], controllers.updateCoupon);
router.delete("/delete/:cid", [verifyAccessToken, isAdmin], controllers.deleteCoupon)
router.get("/:cid", controllers.getACoupon)

module.exports = router