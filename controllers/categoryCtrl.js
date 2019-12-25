
var categoryService = require("../services/categoryService");


var listAllCategory = (req,res)=>{

    console.log("List Category Ctrl");
    categoryService.listAllCategory(req,res);
}

module.exports = {
    listAllCategory: listAllCategory,
}