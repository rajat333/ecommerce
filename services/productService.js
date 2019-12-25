
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 
const domain = require('../model/index');

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

module.exports = {
    listAllProduct : listAllProduct,    
    getCategoryBasedProduct: getCategoryBasedProduct
}