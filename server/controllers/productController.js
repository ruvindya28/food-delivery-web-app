import Product from '../models/Product.js';
import {v2 as cloudinary} from 'cloudinary';
//add products : /api/product/add
export const addProduct = async (req, res) => {
     try{
           let productData = JSON.parse(req.body.productData);

           const images = req.files

           let imagesUrl = await Promise.all(
               images.map(async (item) => {
                   let result = await cloudinary.uploader.upload(item.path, {
                       resource_type: 'image',
                   });
                   return result.secure_url;
               })
           );
           await Product.create({
               ...productData,
               image: imagesUrl,
           })
           res.json({
                success: true,
                message: 'Product added successfully',
           })
     }
     catch(error){
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
     }

}



//get products : /api/product/list
export const productList = async (req, res) => {
     
 
}


//get single products : /api/product/id
export const productById = async (req, res) => {
     

}

//change products instock : /api/product/stock
export const changeStock = async (req, res) => {
     

}