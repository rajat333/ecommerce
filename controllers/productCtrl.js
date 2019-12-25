
var productService = require("../services/productService");

var listAllProduct = function(req,res){
    console.log("listAllProduct CTRL");
    productService.listAllProduct(req,res);

}

var getCategoryBasedProduct = function(req,res){
    console.log("getCategoryBasedProduct getCategoryBasedProduct");
    productService.getCategoryBasedProduct(req,res);
}

module.exports  = {
    listAllProduct: listAllProduct,
    getCategoryBasedProduct: getCategoryBasedProduct,
}