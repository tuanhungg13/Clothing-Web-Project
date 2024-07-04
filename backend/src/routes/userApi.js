import express from 'express';
const router = express.Router();
import controllers from '../controller/userController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken'

router.post('/register', controllers.register);
router.post('/login', controllers.login);
//users
router.get('/current', verifyAccessToken, controllers.getUserById);
router.put('/current', verifyAccessToken, controllers.updateUser);
router.post('/refreshAccessToken', controllers.refreshAccessToken);
router.post('/logout', controllers.logout)
router.put('/addToCart', verifyAccessToken, controllers.addToCart)
//admin
router.get('/list-users', [verifyAccessToken, isAdmin], controllers.getAllUsers)
router.put('/list-users', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin)
router.delete('/list-users', [verifyAccessToken, isAdmin], controllers.deleteUser)


module.exports = router;