
const setResponse = require('../application-utilities/SetResponse');
const configrationHolder  = require('../configrations/ApplicationMessage'); 
const categoryValidation = require('../application-utilities/CategoryValidation');
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
        let categories = [
            { name:"Nikon", type:"Mirrorless", model:"2018" },
            { name:"Nikon", type:"abc", model:"2018" },
            { name:"Nikon", type:"andd", model:"2018" },
        ];
        console.log("Going Loop");
        // async.forEach( categories,async function(element,next){
        try{ 
        for(let i=0; i< categories.length;i++){   
            console.log("element element ",categories[i]);
            let isValidCategory = categoryValidation.validCategory(categories[i]);
            console.log('isValidCategory isValidCategory',isValidCategory);
            if(isValidCategory){
                let isExistCategory = await domain.Category.find({ name: categories[i].name }).lean();
                console.log("isExistCategory isExistCategory",isExistCategory);
                if(isExistCategory.length >0){
                    console.log("ifi if if fif if f")
                    notInserted.push(categories[i]); 
                }else{
                    console.log("else else else")
                    let insertedCategory = await domain.Category.findOneAndUpdate({
                        name: categories[i].name,
                    },{ 
                        $set: {  name:categories[i].name, type:categories[i].type, model:categories[i].model }
                    },{ upsert: true});
                }
            }else{
                notInserted.push(categories[i]);
            }
         }
        setResponse.setSuccess( configrationHolder.Success.InsertedCategory,
                    configrationHolder.InternalAppMessage.InsertedCategory,
                    {  notInserted: notInserted},false,res); 
        }catch(e){
            setResponse.setSuccess( configrationHolder.Error.ExceptionOccur,
                configrationHolder.InternalAppMessage.ExceptionOccur,
                {},true,res);
        }
}

module.exports = {
    listAllCategory : listAllCategory,  
    insertCategory: insertCategory,  
}