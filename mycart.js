const noImage = 'https://www.phswarnerhoward.co.uk/assets/images/no_img_avaliable.jpg';

cartProductList();

function cartProductList(){
    showLoader()
    fetch(cartUrl).then(function(response) {
        return response.json();
    }).then(function(cartData){     
        hideLoader()
        cartProductListItem(cartData);        
    })
}

function cartProductListItem(cartData){     
    let loadTableData = "";    
    
    cartData.forEach((productItem) => {
        
        let proudctQty = productItem.qty ? productItem.qty : '1';
        let productPrice = productItem.qty * productItem.proPrice;
        loadTableData += `
            <tr class="table-row">
            <td valign="middle"><input type="checkbox" class="cart-product" value="1" id="cartPro_${productItem.id}" onchange="selectItem(${productItem.id})" /></td>
            <td valign="middle"><img src="${productItem.proImg ? productItem.proImg : noImage}" style="width:100px;" class="card-img-top" alt="..."></td>
            <td valign="middle">${productItem.proName}</td>
            <td valign="middle">${productItem.proDesc}</td>
            <td valign="middle" class="product-price">${productItem.proPrice}</td>
            <td valign="middle">${productItem.proCat}</td>
            <td valign="middle">
                <input type="number" class="col-md-2 qty" id="product-${productItem.id}" onchange="getQuantity(${productItem.proPrice}, ${productItem.id})" value="${proudctQty}" />
            </td>      
            <td valign="middle">
                <button class="border-0" onclick="deletProduct(${productItem.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>
            </td>
            </tr>
            <input type="hidden" class="pro-cost" value="${productPrice}" id="cost-${productItem.id}" />
        `        
    })    

    document.getElementById("cartListProduct").innerHTML = loadTableData; 
    calCulatePrice();    
    cartValue = cartData.length;
    myCart(cartValue)
}
myCart()

function calCulatePrice(){    
    let proTotalPrice = 0;
    let tableRow = document.querySelectorAll(".table-row");
    tableRow.forEach((tablData) => {
        if(tablData.querySelector(".cart-product:checked")){
           let productPrice = tablData.querySelector('.product-price').innerHTML;           
           let productQty = tablData.querySelector('.qty').value;
           proTotalPrice += parseInt(productPrice) * parseInt(productQty);              
        }
    })    
    document.getElementById("totalPrice").innerHTML = proTotalPrice;
    console.log(tableRow, 'tableRow')
    vat(proTotalPrice)
}

function selectItem(selectedProId){
    calCulatePrice(selectedProId);
}



function getQuantity(proPrice, id){    
    let getProQty = document.getElementById("product-" + id).value;
    let currentQty = parseInt(getProQty);
        
    const updateProQty = {
        method : "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: currentQty })
    }

    fetch('https://api-generator.retool.com/Bl2mIo/data/' + id, updateProQty)
    .then(response => response.json())
    .then(data => cartProductListItem(data))    
    calCulatePrice()
}

function vat(price){
    let vat = (price * 20)/100;
    let productTotalCost = vat + price;
    document.getElementById("vat").innerHTML = vat;
    document.getElementById("totalCost").innerHTML = productTotalCost;
}

function myCart(cartValue){        
    document.getElementById("myCart").innerHTML = cartValue ? cartValue : "";
}

function deletProduct(getDetails){            
    showLoader();    
    fetch('https://api-generator.retool.com/Bl2mIo/data/'+ getDetails, {
            method: 'DELETE',
    }).then(function(){                
            hideLoader();        
            cartProductList();
            myCart();            
        }       
    )
}

function productCheckout(){
    alert('sdfdsfsd')
}