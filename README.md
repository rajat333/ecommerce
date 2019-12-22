# edwisor-task

run by using command NODE_ENV=development nodemon app.js 
which will use 3001 port.

test.js in middleware is Common Middleware which will run on every request

Authentication middleware is middleware that we use in Login but it can do any thing , just by pass the request to other.

Authentication middleware can be used if someone do any activity after login i.e. in Dashboard.

Model 

User.js -  Taken general field which will be needed for register.


configration Folder 

It contains Application Mesaage file which contain all message that is used in Application and also contain configration based on environment.

Application- Utilities
It contains different validation needed in application and Response Utitlity ( SetResponse.js ) file from where all response can be sent.

Routes 

Different application routes defind in route folder .
Like for user register and login , routes is in User.js file 

Db-Connectivity 
It contains file that is used to connect to mongo db 

