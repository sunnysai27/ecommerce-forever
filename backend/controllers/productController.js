import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";


// function for add product
const addProduct = async (req,res) => {
    try {
        const {name, description, price, category, subCategory, sizes , bestseller} = req.body;
        console.log(req.files);

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (img) => {
                let result = await cloudinary.uploader.upload(img.path, {resource_type: "image"});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes : JSON.parse(sizes),
            bestseller : bestseller === "true" ? true : false,
            image: imagesUrl,
            Date: Date.now(),
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();


        
        res.json({success: true , msg: "Product added"});



    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message});
        
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true , products});


    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message});
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, msg: "Product Removed"});
    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message});
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const productInfo = await productModel.findById(productId);
        res.json({success: true, productInfo});
    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message});
    }
}


export {addProduct, removeProduct, listProducts, singleProduct};

