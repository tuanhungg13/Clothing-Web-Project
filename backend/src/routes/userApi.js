const express = require('express');
const router = express.Router();
const controllers = require('../controller/userController.js');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.js')
const uploadCloudUser = require("../config/cloudinaryUser.js")
router.post('/register', controllers.register);
router.post('/login', controllers.login);
//users
router.get('/current', verifyAccessToken, controllers.getUserById);
router.put('/current', verifyAccessToken, uploadCloudUser.single("avatar"), controllers.updateUser);
router.get('/refreshAccessToken', controllers.refreshAccessToken);
router.post('/logout', controllers.logout)
router.put('/addToCart', verifyAccessToken, controllers.addToCart)
router.put("/removeFromCart", verifyAccessToken, controllers.removeFromCart)
//admin
router.get('/', [verifyAccessToken, isAdmin], controllers.getAllUsers)
router.put('/', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin)
router.delete('/', [verifyAccessToken, isAdmin], controllers.deleteUser)


module.exports = router;