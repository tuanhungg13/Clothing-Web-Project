import express from 'express';
const router = express.Router();
import controllers from '../controller/billController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create", verifyAccessToken, controllers.createNewBill);
router.get('/', [verifyAccessToken, isAdmin], controllers.getBills);


module.exports = router