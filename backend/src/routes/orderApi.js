const express = require('express');
const router = express.Router();
const controllers = require('../controller/orderController.js');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.js');

router.post("/", controllers.createNewOrder);
router.post("/guest", controllers.createNewOrder);
router.get('/getOrderByAdmin', [verifyAccessToken, isAdmin], controllers.getOrdersByAdmin);
router.get("/getOrderByUser", [verifyAccessToken], controllers.getOrdersByUser)
router.put("/updateOrderByAdmin", [verifyAccessToken, isAdmin], controllers.updateOrderByAdmin)
router.put("/updateOrderByUser", [verifyAccessToken], controllers.updateOrderByUser)

module.exports = router