const categoryDetails = require('../configrations/category.json');

var category = categoryDetails.categoryList;
var validateCartProduct = function(productData){
    
      let keys = Object.keys(productData);
      console.log("key s",keys);
      if(  keys.includes('name') && keys.includes('description') &&
           keys.includes('price') &&  keys.includes('make') && keys.includes('category')
       ){
            return true;
       }else{
            return false;
       }
}

var addProduct = (productData)=>{
     console.log("Add Prod Validation")
     let keys = Object.keys(productData);
     if(keys.includes('name') && keys.includes('category') && 
        keys.includes('description') && keys.includes('make') && keys.includes('price') ){
          return true;        
     }else{
          return false;
     }
};   

module.exports= {
    validateCartProduct: validateCartProduct,
    addProduct: addProduct,
    isValidProduct:addProduct 
}