
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
                return{
                    port:3001,
                    dev: true,
                    prod: false,
                }
                break;                         
    }
    // return true;
};

module.exports = {

   getEnvData: getEnvironmentData,
}