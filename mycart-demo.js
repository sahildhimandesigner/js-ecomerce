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
    let subTotal = 0;    
    let loadTableData = "";
    // cartData = cartData.filter(element => element.proName);   

    cartData.forEach((productItem) => {     
        let proudctQty = productItem.qty ? productItem.qty : '1';
        let productPrice = productItem.qty * productItem.proPrice;
        
        loadTableData += `
            <tr>
            <td valign="middle"><input type="checkbox" value="1" id="cartPro_${productItem.id}" onchange="selectItem(${productItem.id})" /></td>
            <td valign="middle"><img src="${productItem.proImg ? productItem.proImg : noImage}" style="width:100px;" class="card-img-top" alt="..."></td>
            <td valign="middle">${productItem.proName}</td>
            <td valign="middle">${productItem.proDesc}</td>
            <td valign="middle">${productItem.proPrice}</td>
            <td valign="middle">${productItem.proCat}</td>
            <td valign="middle">
                <input type="number" class="col-md-2" id="product-${productItem.id}" onkeyup="getQuantity(${productItem.proPrice}, ${productItem.id})" value="${proudctQty}" />
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
        
        //parseInt use to conver string to number
        // price = productPrice        
        // subTotal = subTotal + price;       
        
                        
        document.getElementById("cartListProduct").innerHTML = loadTableData;        
    })    

    cartValue = cartData.length;
    myCart(cartValue)
}
myCart()

function selectItem(selectedProId){    
    let subTotal = 0;
    let getPrice = 0;
    let dddd = document.getElementById("cartPro_"+selectedProId);
    console.log(dddd, 'dddd')
    if(document.getElementById("cartPro_"+selectedProId).checked){
       getPrice = document.getElementById("cost-"+selectedProId).value;
       
       subTotal = subTotal + getPrice;
       vat(subTotal);
       document.getElementById("totalPrice").innerHTML = subTotal;
    }
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
    cal(proPrice, id);                
    calPrice();
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

function calPrice(getDetails){
    let newSub = 0;    
    if(getDetails){
        let newValue = document.getElementById("cost-" +getDetails).value;
        
        //get the all product item for iterate
        let getId = document.querySelectorAll('.pro-cost');
        
        //adding all the product value into newsub var
        for(k=0; k < getId.length; k++){        
            newSub += parseInt(getId[k].value);
        }

        let dd = newSub - newValue;

        document.getElementById("totalPrice").innerHTML = dd;
        vat(dd);
    }    
    else {
        //get the all product item for iterate
        let getId = document.querySelectorAll('.pro-cost');

        //adding all the product value into newsub var
        for(k=0; k < getId.length; k++){        
            newSub += parseInt(getId[k].value);
        }
        document.getElementById("totalPrice").innerHTML = newSub;
        vat(newSub);
    }
}

function cal(proPrice, id){
    let totalcost = 0;
    qvalue = document.getElementById("product-" + id).value;    

    let quantity =  parseInt(qvalue)
    if(quantity > 1){
        totalcost = (proPrice) * (quantity - 1);
    }
    if(quantity > 0){
        totalcost = proPrice * quantity;
    }
    document.getElementById("cost-" +id).value = totalcost;
}

function deletProduct(getDetails){        
    calPrice(getDetails)
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

// testApi();
// function testApi(){
//     const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'Content-Type': 'application/json',
// 		'X-RapidAPI-Key': '4ed8005f40mshb1acace068fd8c4p18b964jsn57e9401c255a',
// 		'X-RapidAPI-Host': 'pincode.p.rapidapi.com'
// 	},
// 	body: '{"searchBy":"pincode","value":110001}'
// };
// let tst = '';
// fetch('https://pincode.p.rapidapi.com/', options)
// 	.then(response => response.json())
// 	.then(function(data){        
//         data.forEach((userInfo) =>{
//             console.log(userInfo)
//             tst += `<li><span>${userInfo.pin}</span> <span>${userInfo.office}</span> <span>${userInfo.division}</span></li>`            
//         })
//         document.getElementById("tst").innerHTML = tst;
//     })
// 	.catch(err => console.error(err));
    
// }


function productCheckout(){
    alert('sdfdsfsd')
}