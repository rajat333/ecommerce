
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 
const domain = require('../model/index');
const async  = require('async');

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
            { name:"Nikon", type:"abc", model:"2018" },
            { name:"Nikon", type:"andd", model:"2018" },
        ];
        async.forEach( categoryInsertArray,async function(element,next){
            console.log("element element ",element);
            let isExistCategory = await domain.Category.find({ name: element.name }).lean();
            console.log("isExistCategory isExistCategory",isExistCategory);
            if(isExistCategory.length >0){
                console.log("ifi if if fif if f")
                notInserted.push(element);
            }else{
                console.log("else else else")
                let insertedCategory = await domain.Category.findOneAndUpdate({
                    name: element.name,
                },{ 
                    $set: {  name:element.name, type:element.type, model:element.model }
                },{ upsert: true});
                inserted.push(insertedCategory);
               console.log("insertedCategory insertedCategory",insertedCategory);
            }
            next();
        },function(err){
            console.log("Task Completed");
            setResponse.setSuccess( configrationHolder.Success.InsertedCategory,
                configrationHolder.InternalAppMessage.InsertedCategory,
                { inserted: inserted},false,res);
        });

}

module.exports = {
    listAllCategory : listAllCategory,  
    insertCategory: insertCategory,  
}