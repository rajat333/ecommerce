var mongoose = require('mongoose');

var dbConnection = function(){

    console.log('>>In>>>>DB>>>Connection>>>>');
    mongoose.connect('mongodb://localhost:27017/edwisor',{ useNewUrlParser: true }, function (err, db) {  
    console.log('>>err>>db>>>',err);
    if (err) throw err
   
        return db;

    })
}
module.exports = {
    dbConnection: dbConnection
}