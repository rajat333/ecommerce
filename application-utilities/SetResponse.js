
var setSuccess  = function( responseMessage, messageCode, data,error,response ){

    var responseObj  = {
         response:{
              responseCode: 200,
              responseMessage: responseMessage,
              messageCode: messageCode,
              serverDate: new Date(),
         },
         data:{
             error: error,
             ...data,
         }
    }

    response.json(responseObj);
};   

var setError = function( responseMessage, messageCode, data,error,response ){

        var responseObj  = {
             response:{
                  responseCode: 200,
                  responseMessage: responseMessage,
                  messageCode: messageCode,
                  serverDate: new Date(),
            },
             data:{
                 error: error,
                 ...data,
             }
        }

        response.json(responseObj);
};   

module.exports = {

    setSuccess: setSuccess,
    setError : setError,
}