// const user_login = 'https://api-generator.retool.com/nshqf8/data?user_name=value';

function userLogin(){
    let user_email = "";
    let user_password = "";
    let userCred = [];

    let user = "sahil@yopmail.com";
    let pass = "admin@123"

    user_email = document.getElementById("user_email").value;
    user_password = document.getElementById("user_password").value;

    if(user_email == user && user_password == pass) {
        window.location.replace("file:///var/www/html/js/ecomerce/product-list.html");
        userDetails = true;
        // userCred.push = ([user_email, user_password]);
        // let localDetail = localStorage.setItem('userCred', JSON.parse(userCred))
        // console.log(localDetail, 'localDetail')

        if(localStorage.getItem('usrDet') == null){ 
            userCred = [{user_email, user_password, userDetails}]
            localStorage.setItem('usrDet', JSON.stringify(userCred));
        }
        else {
            userCred = JSON.parse(localStorage.getItem('usrDet'));
            userCred.push({user_email, user_password, userDetails})
            localStorage.setItem('usrDet', JSON.stringify(userCred));
            console.log(userCred, 'userCred')
        } 
    }
    else {
        console.log('enter the wrong user details')
    }

     // if(localStorage.getItem('eStore') == null){
    //     ecartStore = []        
    //     ecartStore[{productName, productPrice, description, product_image, product_category}]
    //     localStorage.setItem('eStore', JSON.stringify(ecartStore));
    // }
    // else {
    //     ecartStore = JSON.parse(localStorage.getItem('eStore'));
    //     ecartStore.push({productName, productPrice, description, product_image, product_category})
    //     localStorage.setItem('eStore', JSON.stringify(ecartStore));
    //     console.log(ecartStore, 'ecartst')
    // } 
    

    //  fetch("https://api-generator.retool.com/nshqf8/data?" +user_email + "=" + user_password, {
    //     method: 'get',
    // }).then(function(response){
    //     console.log(response, 'rese')
    //     // if(response.status == 200) {
    //     //    window.location.replace("file:///var/www/html/js/ecomerce/product-list.html");
    //     // }
    //     // else {
    //     //     console.log('wrong user details')
    //     // }        
    // })
}