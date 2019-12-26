
var categoryService = require("../services/categoryService");

var listAllCategory = (req,res)=>{
    categoryService.listAllCategory(req,res);
}
var insertCategory = (req,res)=>{
    categoryService.insertCategory(req,res);
}

module.exports = {
    listAllCategory: listAllCategory,
    insertCategory: insertCategory,
}