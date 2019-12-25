const categoryDetails = require('../configrations/category.json');
const categoryType = categoryDetails.categoryList;

var validCategory = (data)=>{

    let keys = Object.keys(data);
    if(keys.includes('name') && keys.includes('type') && keys.includes('model')){
        if(categoryType.includes(data.type))
            return true;
        else 
         return false;
    }else{
        return false;
    }
}

module.exports = {
    validCategory: validCategory
}