
var validCategory = (data)=>{

    let keys = Object.keys(data);
    if(keys.includes('name') && keys.includes('type') && keys.includes('model')){

        let categoryType = ["Mirrorless", "full frame", "point and shoot"];
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