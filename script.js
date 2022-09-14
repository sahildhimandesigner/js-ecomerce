const url = 'https://api-generator.retool.com/BsUw6I';
const cartUrl = 'https://api-generator.retool.com/Bl2mIo/data'

const addProBtn = document.getElementById('add_product');

let cartValue = 0;
let userDetails = false;

function setProductData(){
    ecartStore = []
    let product_name = document.getElementById('productName').value;
    let product_price = document.getElementById('productPrice').value;
    let description = document.getElementById('description').value;
    let product_image = document.getElementById('product_image').value;
    let product_category = document.getElementById('category').value;

    if(product_name == ""){
        document.querySelector(".name-error").innerHTML = "enter the value";
    }
    else if (product_price == ""){
        document.querySelector(".product-error").innerHTML = "enter the product price";        
    }
    else {
        postData()
    }

    const userid = 1;

    ecartStore = {product_name, product_price, description, product_image, product_category, userid}
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "https://api-generator.retool.com/BsUw6I/data");    
    // xhr.setRequestHeader("Content-Type", "application/json");    
    // xhr.send(ecartStore, 'send data');
            
    function postData(){
        $(document).ready(function(){
        $.post("https://api-generator.retool.com/BsUw6I/data",
        {
            product_name,
            product_price,
            description,
            product_image,
            product_category,
            userid,
        },
        function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);

            // Show success message after added product
            document.getElementById("sucess_message").innerHTML = "Product Added Sucessfully";

            //Clear the input value after submited data
            product_name = document.getElementById('productName').value = "";
            product_price = document.getElementById('productPrice').value = "";
            description = document.getElementById('description').value = "";
            product_image = document.getElementById('product_image').value = "";
            product_category = document.getElementById('category').value = "";
        });
    })
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
}
privateRoute();
function privateRoute(){
    checkValue = JSON.parse(localStorage.getItem('usrDet'));    
    userDetails = checkValue.userDetails;    
    if(userDetails){
        let allNav = document.querySelectorAll('.private-link');
        allNav.style.display = 'block';
        console.log(allNav, 'allNav')
    }        
}

function logoutUser(){
    localStorage.clear('usrDet');
}

function showLoader(){
    document.getElementById("cssloader").style.display = "block";
}

function hideLoader(){
    document.getElementById("cssloader").style.display = "none";
}

