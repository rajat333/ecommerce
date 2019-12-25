
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 
const productValidation = require("../application-utilities/ProductValidation");
const domain = require('../model/index');
const mongoose = require('mongoose');
const async = require('async');

async function listAllProduct(req,res){

        try{
        let listOfCategory =  await domain.Product.find({}).lean();
        setResponse.setSuccess( configrationHolder.Success.CategoryList,
            configrationHolder.InternalAppMessage.CategoryList,
            { categoryList: listOfCategory },true,res);

        }catch(e){
            setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                configrationHolder.InternalAppMessage.ExceptionOccur,
                {},true,res);
        }
        
}

async function getCategoryBasedProduct(req,res){

            try{
             let productList = domain.Product.find({  category: req.body.category }).lean();
             setResponse.setSuccess( configrationHolder.Success.ProductBasedOnCategory,
                configrationHolder.InternalAppMessage.ProductBasedOnCategory,
                { categoryList: productList },false,res);
            }catch(e){
                setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                    configrationHolder.InternalAppMessage.ExceptionOccur,
                    {},true,res);
            }

}

async function addtoCart(req,res){
  console.log("Prod Service addto Cart");
   var  userId = req.loginUser._id
   let isValidProduct = productValidation.validateCartProduct(req.body);
   if(!isValidProduct){
    setResponse.setError( configrationHolder.Error.ValidationFail,
        configrationHolder.InternalAppMessage.ValidationFail,
        {},true,res);
   }else{
       let productInfo = req.body;
       try{
       // Check Category Exist:
       let isExistCategory = domain.Category.find({  name: productInfo.category }).lean();
        if(isExistCategory){

            let cartAdded = new domain.Cart({ user: userId, productInfo: productInfo });
            cartAdded.save(function(err,data){

                 if(err){
                     console.log("err err",err);
                    setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                        configrationHolder.InternalAppMessage.ExceptionOccur,
                        { },true,res);
                 }else{
                     // Successfully added product to cart
                    console.log("Successfully added to cart based on user preference");
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
    console.log("getUserCart Prod Service loginUser",req.loginUser);
    try{
        let cartList = await domain.Cart.find({ user: mongoose.Types.ObjectId(req.loginUser._id) }).lean()
        setResponse.setSuccess( configrationHolder.Success.GetCart,
            configrationHolder.InternalAppMessage.GetCart,
            { cartList: cartList },false,res);
    }catch(err){
        setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
            configrationHolder.InternalAppMessage.ExceptionOccur,
            { },true,res);
    }
}

module.exports = {
    listAllProduct : listAllProduct,    
    getCategoryBasedProduct: getCategoryBasedProduct,
    addtoCart: addtoCart,
    getUserCart: getUserCart
}