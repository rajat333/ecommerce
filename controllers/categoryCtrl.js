
var categoryService = require("../services/categoryService");


var listAllCategory = (req,res)=>{

    console.log("List Category Ctrl");
    categoryService.listAllCategory(req,res);
}
var insertCategory = (req,res)=>{
    console.log("Insert Category CTRL");
    categoryService.insertCategory(req,res);
}

module.exports = {
    listAllCategory: listAllCategory,
    insertCategory: insertCategory,
}