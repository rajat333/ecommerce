
var getEnvironmentData = function(){
    switch(process.env.NODE_ENV){

        case 'development': 
                    return{
                        port:3001,
                        dev: true,
                        prod: false,
                    }
                    break;
        
        case 'staging': 
            return{
                port:3002,
                dev: true,
                prod: false,
            }
            break;
        case 'production':
                        return{
                            port: 3003,
                            dev: false,
                            prod: true,
                        }
                    break;
        default:    
                console.log('>>>>>>In>>Deafult>>Case>>>>');                            
    }
    // return true;
};

module.exports = {

   getEnvData: getEnvironmentData,
}