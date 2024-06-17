import express from 'express';
const router = express.Router();
import controllers from '../controller/userController'

router.post('/register', controllers.register)


module.exports = router;