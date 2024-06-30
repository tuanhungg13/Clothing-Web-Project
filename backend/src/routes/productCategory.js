import express from 'express';
const router = express.Router();
import controllers from '../controller/prodCategoryController';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken';

router.post("/create");
router.get('/')



module.exports = router