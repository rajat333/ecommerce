
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 
const productValidation = require("../application-utilities/ProductValidation");
const domain = require('../model/index');
const mongoose = require('mongoose');
const async = require('async');

async function listAllProduct(req,res){

        try{
        let listOfProducts =  await domain.Product.find({}).lean();
        setResponse.setSuccess( configrationHolder.Success.ProductList, 
            configrationHolder.InternalAppMessage.ProductList,
            { productList: listOfProducts },false,res);

        }catch(e){
            setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                configrationHolder.InternalAppMessage.ExceptionOccur,
                {},true,res);
        }
        
}

async function getCategoryBasedProduct(req,res){

            try{
             let productList = await domain.Product.find({  category: req.body.category }).lean();
             setResponse.setSuccess( configrationHolder.Success.ProductBasedOnCategory,
                configrationHolder.InternalAppMessage.ProductBasedOnCategory,
                { productList: productList },false,res);
            }catch(e){
                console.log("Exception ",e);
                setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                    configrationHolder.InternalAppMessage.ExceptionOccur,
                    {},true,res);
            }

}

async function addtoCart(req,res){
  var  userId = req.loginUser._id
  let isValidProduct = productValidation.validateCartProduct(req.body.product);
   if(!isValidProduct){
    setResponse.setError( configrationHolder.Error.ValidationFail,
        configrationHolder.InternalAppMessage.ValidationFail,
        {},true,res);
   }else{
       let productInfo = req.body.product;
       try{
       // Check Category Exist:
       let isExistCategory = domain.Category.find({  name: productInfo.category }).lean();
        if(isExistCategory){

            let cartAdded = new domain.Cart({ 
                user: mongoose.Types.ObjectId(userId), 
                productId: mongoose.Types.ObjectId(productInfo._id), 
                productInfo: productInfo });
                cartAdded.save(function(err,data){

                 if(err){
                     console.log("err err",err);
                    setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                        configrationHolder.InternalAppMessage.ExceptionOccur,
                        { },true,res);
                 }else{
                     // Successfully added product to cart
                    setResponse.setSuccess( configrationHolder.Success.AddToCart,
                        configrationHolder.InternalAppMessage.AddToCart,
                        { },false,res);
                 }
            })
        }else{
            setResponse.setSuccess( configrationHolder.Success.NoCategory,
                configrationHolder.InternalAppMessage.NoCategory,
                { },true,res);
        } 
       }catch(e){
        setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
            configrationHolder.InternalAppMessage.ExceptionOccur,
            { },true,res);
       }
   }
}

var getUserCart = async function(req,res){
    try{
        let cartList = await domain.Cart.find({ user: mongoose.Types.ObjectId(req.loginUser._id) },{productInfo:1, _id:0}).lean();
        setResponse.setSuccess( configrationHolder.Success.GetCart,
            configrationHolder.InternalAppMessage.GetCart,
            { cartList: cartList },false,res);
    }catch(err){
        setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
            configrationHolder.InternalAppMessage.ExceptionOccur,
            { },true,res);
    }
}

var addProduct = async function(req,res){

        let product = req.body;
        try{
            let isValidProduct = productValidation.isValidProduct(product);
            if(isValidProduct){
                 let existCategory = await domain.Category.find({ name: product.category }).lean();
                 if(existCategory.length >0){
                    let productData = new domain.Product(product);
                    productData.save(function(err,data){
                            if(err){
                                setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                                    configrationHolder.InternalAppMessage.ExceptionOccur,
                                    { },true,res);
                            }else{
                                setResponse.setSuccess( configrationHolder.Success.ProductInsert,
                                    configrationHolder.InternalAppMessage.ProductInsert,
                                    { productDetails: data },false,res);
                            }

                    });
                }else{
                    // Category not exist
                    setResponse.setSuccess( configrationHolder.Error.CategoryNotExist,
                        configrationHolder.InternalAppMessage.CategoryNotExist,
                        { },true,res);
                }
            }else{
                setResponse.setSuccess( configrationHolder.Error.ValidationFail,
                    configrationHolder.InternalAppMessage.ValidationFail,
                    { },true,res);
            }
        }catch(e){
            console.log("Exception ",e);
            setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                configrationHolder.InternalAppMessage.ExceptionOccur,
                { },true,res);  
        }
}

module.exports = {
    listAllProduct : listAllProduct,    
    getCategoryBasedProduct: getCategoryBasedProduct,
    addtoCart: addtoCart,
    getUserCart: getUserCart,
    addProduct:addProduct
}