var mongoose = require('mongoose');

var dbConnection = function(){
    
    mongoose.connect('mongodb://localhost:27017/ecommerce',{ useNewUrlParser: true }, function (err, db) {  
    console.log('>>err>>db>>>',err);
    if (err) throw err
   
        return db;

    })
}
module.exports = {
    dbConnection: dbConnection
}