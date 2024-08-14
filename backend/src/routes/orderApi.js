import express from 'express';
const router = express.Router();
import controllers from '../controller/orderController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/", controllers.createNewOrder);
router.get('/', [verifyAccessToken, isAdmin], controllers.getOrders);


module.exports = router