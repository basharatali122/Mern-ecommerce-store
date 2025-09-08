
const Product = require("../models/productModel");
const ErrorHanlder = require("../utils/errorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
// add products -- Admin
exports.addProducts = catchAsyncErrors(async (req, res, next) => {


    const product = await Product.create(req.body)

    await product.save();
    res.status(200).json({ message: "Product added successfully.", success: true, product })

})
exports.getAllProducts = catchAsyncErrors(async (req, res) => {



    const products = await Product.find();


    res.status(200).json({ success: true, products })


})

//Update a product --- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {


    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHanlder("product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false },)

    product.save();

    res.status(200).json({ message: "product update success fully", success: true, product })

}
)
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {


    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHanlder("product not found", 404))
    }

    await product.deleteOne();

    res.status(200).json({ message: "product deleted successfully", success: true })

})

exports.productDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHanlder("product not found", 404))
    }
    res.status(200).json({ success: true, product })


})