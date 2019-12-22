
var logger = function(req,res,next){

    console.log('>> In Common Middleware>>>>',req.url);
    next();
}

module.exports = {
    logger:logger,
}