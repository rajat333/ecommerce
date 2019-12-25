
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 
const domain = require('../model/index');

async function listAllCategory(req,res){

        try{
            let listOfCategory =  await domain.Category.find({}).lean();
            setResponse.setSuccess( configrationHolder.Success.CategoryList,
                configrationHolder.InternalAppMessage.CategoryList,
                { categoryList: listOfCategory },true,res);

        }catch(e){
            setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                configrationHolder.InternalAppMessage.ExceptionOccur,
                {},true,res);
        }
        
}


module.exports = {
    listAllCategory : listAllCategory,    
}