var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CartSchema = new Schema({
    
    createdAt: { type: Date },
    updatedAt: { type: Date, default: Date.now },
    user:{
        type: 'ObjectId',
        required: true,
        ref:"User"
    },
    productId:{
      type: 'ObjectId',
      required: true,
      ref:"Product"
    },
    productInfo:{
      type: Object,
      required: true
    }
    // ,
    // model: { 
    //   type: String, 
    //   required: false
    // }
    
});

var Cart = mongoose.model('Cart', CartSchema);

// on every save, add the date
CartSchema.pre('save', function(next) {
    // get the current date
    console.log("pre save",this);
    var currentDate = new Date();
    if (!this.created_at)
      this.createdAt = currentDate;
      next();
});

module.exports = Cart;
