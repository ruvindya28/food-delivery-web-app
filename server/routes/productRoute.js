import express from 'express';
import { upload } from '../middlewares/multer.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import authSeller from '../middleware/authSeller.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array([images]), authSeller,addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.post('stock',authSeller,changeStock)

export default productRouter;
