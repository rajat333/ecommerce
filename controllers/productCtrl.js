
var productService = require("../services/productService");

var listAllProduct = function(req,res){
    productService.listAllProduct(req,res);

}

var getCategoryBasedProduct = function(req,res){
    productService.getCategoryBasedProduct(req,res);
}

var addtoCart = function(req,res){
    productService.addtoCart(req,res);
}

var getUserCart = function(req,res){
    productService.getUserCart(req,res);
}

var addProduct = function(req,res){
    productService.addProduct(req,res);
}

module.exports  = {
    listAllProduct: listAllProduct,
    getCategoryBasedProduct: getCategoryBasedProduct,
    addtoCart: addtoCart,
    getUserCart:getUserCart,
    addProduct:addProduct
}