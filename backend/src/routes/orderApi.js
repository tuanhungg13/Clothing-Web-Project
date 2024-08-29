import express from 'express';
const router = express.Router();
import controllers from '../controller/orderController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/", verifyAccessToken, controllers.createNewOrder);
router.post("/guest", controllers.createNewOrder);
router.get('/', [verifyAccessToken], controllers.getOrders);
router.put("/updateOrderByAdmin", [verifyAccessToken, isAdmin], controllers.updateOrderByAdmin)
router.put("/updateOrderByUser", [verifyAccessToken], controllers.updateOrderByUser)

module.exports = router