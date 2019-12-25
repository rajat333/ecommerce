var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name:  {
      type:String,
      required: true,

    } ,
    category:{
      type: String,
      required: true,
      ref:"category"
    },
    description: { 
      type: String, 
      required: true
    },
    quantity:{
      type:String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    price:{
      type: String,
      required: true,
    },
    make:{
      type: Number,
      required: true
    }
    
});

var Product = mongoose.model('Product', ProductSchema);

// on every save, add the date
ProductSchema.pre('findOneAndUpdate', function(next) {
  // get the current date
  console.log("this pre save ",this);
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updatedAt = currentDate;
  next();
});


module.exports = Product;
