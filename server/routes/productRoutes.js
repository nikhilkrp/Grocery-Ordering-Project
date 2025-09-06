import express from "express"
import authSeller from '../middleware/authSeller.js'
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import {upload} from "../middleware/multer.js"

const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authSeller, addProduct)
productRouter.post('/list',productList)
productRouter.post('/id',productById)
productRouter.post('/stock',authSeller, changeStock)

export default productRouter