
const Product = require("../models/productModel")

// add products -- Admin
exports.addProducts = async (req, res, next) => {

    try {
        const product = await Product.create(req.body)

        await product.save();
        res.status(200).json({ message: "Product added successfully.", success: true, product })
    }
    catch (err) {
        res.status(400).json({ message: "server error", Error: err.message })
    }
}
exports.getAllProducts = async (req, res) => {

    try {

        const products = await Product.find();


        res.status(200).json({ success: true, products })

    }
    catch (err) {

        res.status(400).json({ message: "server error", Error: err.message })
    }
}

//Update a product --- Admin
exports.updateProduct = async (req, res, next) => {
    try {

        let product = await Product.findById(req.params.id)

        if (!product) {
            res.status(400).json({ message: "Product not found", success: false })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false },)

        product.save();

        res.status(200).json({ message: "product update success fully", success: true, product })
    }
    catch (err) {
        res.status(400).json({ message: "server error", Error: err.message })
    }
}

exports.deleteProduct = async (req,res,next)=>{
    try{

        const product =await Product.findById(req.params.id)
        if(!product){
            res.status(400).json({message:"product not found", success:false})
        }

        await product.deleteOne();

        res.status(200).json({message:"product deleted successfully", success:true})
    }
    catch(err){
        res.status(400).json({message:"server error",Error:err.message})
    }
}

exports.productDetails = async (req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            res.status(400).json({message:"product not found",success:false})
        }
        res.status(200).json({success:true,product})

    }
    catch(err){
        res.status(400).json({message:"server error",Error:err.message})
    }
}