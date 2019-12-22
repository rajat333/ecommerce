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
      enum: ["Mirrorless", "full frame", "point and shoot"]
    },
    model: { 
      type: String, 
      required: true
    }
    
});

var Category = mongoose.model('Category', CategorySchema);

// on every save, add the date
CategorySchema.pre('save', function(next) {
    // get the current date
    console.log("pre save",this);
    var currentDate = new Date();
    if (!this.created_at)
      this.createdAt = currentDate;
      next();
});

module.exports = Category;
