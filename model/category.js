const categoryDetails = require('../configrations/category.json');

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CategorySchema = new Schema({
    
    createdAt: { type: Date },
    updatedAt: { type: Date, default: Date.now },
    name:  {
      type:String,
      required: true,
    } ,
    type:{
      type: String,
      required: true,
      enum: categoryDetails.categoryList,
    },
    model: { 
      type: String, 
      required: true
    }
    
});

var Category = mongoose.model('Category', CategorySchema);

// on every save, add the date
CategorySchema.pre('findOneAndUpdate', function(next) {
    // get the current date
    var currentDate = new Date();
    if (!this.created_at)
      this.createdAt = currentDate;
      next();
});

module.exports = Category;
