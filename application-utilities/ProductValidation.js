let category = ["Mirrorless", "full frame", "point and shoot"];
var validateCartProduct = function(productData){
    
      let keys = Object.keys(productData);
      if(  keys.includes('name') && keys.includes('description') &&
           keys.includes('price') &&  keys.includes('make') && keys.includes('category')
       ){
            return true;
       }else{
            return false;
       }
}

module.exports= {
    validateCartProduct: validateCartProduct 
}