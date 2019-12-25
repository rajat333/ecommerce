
var ErrorMessage = {

        ValidationFail: 'Please enter all the fields',
        LoginFail: 'Please enter valid username or password',
        UserExist: 'User Exist With this mailid. Please choose different mailid',
        ExceptionOccur : 'Sorry, we are facing some technical issue. Please try again later.',

};

var SuccessMessage = {

        Register: 'Successfully Register User',
        Login: 'Successfully Login User',   
        CategoryList:"Successfully Get Category List", 
        ProductList:"Successfully Get Product List", 
        ProductBasedOnCategory:"Successfully Get Product on Category Basis",
        NoCategory:"Sorry, no categoryExist for the product you are adding to cart",
        AddToCart:"Successfully Added Product To Cart"
        
};

var InternalAppMessage = {

       Login: 'App.Login.Success',
       Register: 'App.Register.Success',
       ValidationFail: 'App.Validation.Fail',
       ExceptionOccur: 'App.Exception.Error',
       LoginFail: 'App.Login.Fail', 
       UserExist: 'App.Username.Exist',
       CategoryList:"App.Category.List",
       ProductList:"App.ProductList.List",
       ProductBasedOnCategory:"App.Product.Category.List",
       NoCategory:"App.NotExistence.Category",
       AddToCart:"App.Product.Added.Cart"
}

var Keys  = {

    tokenSecretKey :'bfashgdfyagfbasjkdgfawhskjfbasjkdfbkj',
    tokenSecretTime: '2h',
}

module.exports = {

       Error: ErrorMessage,
       Success: SuccessMessage,
       InternalAppMessage:  InternalAppMessage,
       Keys: Keys,
}