
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

async function insertCategory(req,res){

        var notInserted =[],inserted=[]; 
        let categoryInsertArray = [
            { name:"Nikon", type:"Mirrorless", model:"2018" },
            { name:"Nikon", type:"point and shoot", model:"2018" },
            { name:"Nikon", type:"full frame", model:"2018" },
        ];
        async.forEach( categoryInsertArray,async function(element,next){

            let isExistCategory = await domain.Category.find({ name: element.name }).lean();
            if(isExistCategory){
                notInserted.push(element);
            }else{
                let insertedCategory =  new domain.Category(element);
                insertCategory.save(function(err,data){

                        if(err){
                            notInserted.push(element);
                            console.log("errr insertion occur",err);
                        }else{
                            console.log('Inserted category',element);
                            inserted.push(element);
                        }
                });
            }
        },function(err){
            console.log("Task Completed");
            setResponse.setSuccess( configrationHolder.Success.InsertedCategory,
                configrationHolder.InternalAppMessage.InsertedCategory,
                {  notInserted: notInserted },false,res);
        })

}

module.exports = {
    listAllCategory : listAllCategory,  
    insertCategory: insertCategory,  
}