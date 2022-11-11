getDataForPag();

function getDataForPag(){    
    fetch('https://api-generator.retool.com/BsUw6I/data', {
        method: 'get'
    }).then(function(response){
        return response.json()
    }).then(function(pageData){                
        showPag(pageData.length);
        let setPageValue = pageData.length/10;        
        let total = Math.ceil(setPageValue)
        document.getElementById("totalLength").value = total;
        getPaginationData(1, total)
    })
}

// showPag(document.getElementById("totalLength").value);

function showPag(pageData){
    totalData = pageData;    
    let noOfpage = Math.ceil(totalData / 10);        
    
    let pagination =`<nav><ul class='pagination'><li class='page-item prev-page'><a href='javascript:void(0)' id="prevPage" onclick='prevPage(${noOfpage})'>prev</a></li>`;
    
    for(i=1; i<=noOfpage; i++){                        
        let active = "";
        if(i==1){            
           active = "active";
        }
        pagination +=`<li class='page-item'><a class='page-link ${active}' id="page-${[i]}" onclick='getPaginationData(${[i]}, ${noOfpage})' href="javascript:void(0)">${[i]}</a></li>`;                
    }    
    pagination += `<li class='page-item px-2 next-page'><a href='javascript:void(0)' id="nextPage" onclick='nextPage(${noOfpage})'>next</a></li></ul></nav>`;     
    document.getElementById("pagination").innerHTML = pagination;        
    document.getElementById("prevPage").classList.add("dis");
}



function getPaginationData(pageId, noOfpage){    
    let pageNo = document.getElementById("page-" + pageId);
    let pageLink = document.getElementsByClassName("page-link");    
        
    for(i=1; i <= pageLink.length; i++){        
        document.getElementById("page-" + [i]).classList.remove("active");
    }
    
    fetch(url + '/data?_page='+ pageId +'&_limit=10').then(function(response) {                
    return response.json();
    }).then(function(data) {
       productList(data);       
       document.getElementById("currentPage").value = pageId;
       setlink(pageId, noOfpage)
    }).catch(function(error) {
        console.log(error, "Get Product list error");
    });

    pageNo.classList.add("active"); 
}

function setlink(id, noOfpage){    
    if(id == 1){        
        document.getElementById("prevPage").classList.add("dis");
    }
    if((noOfpage > 1) && (id > 1)){
        document.getElementById("prevPage").classList.remove("dis");
    }
    if(parseInt(id) == parseInt(document.getElementById("totalLength").value)){
        document.getElementById("nextPage").classList.add("dis");
    }
    if(parseInt(id) < parseInt(document.getElementById("totalLength").value)){
        document.getElementById("nextPage").classList.remove("dis");
    }    
}


function nextPage(totalPage){        
    let getCurrentValue = document.getElementById("currentPage").value;    
    let selectedPage = parseInt(getCurrentValue)    
    if((selectedPage < totalPage) && (selectedPage >= 1)) {         
        document.getElementById("prevPage").classList.remove("dis");       
        updateCurrentPage = selectedPage + 1; 
        selectedValue = document.getElementById("currentPage").value = updateCurrentPage;         
        getPaginationData(selectedValue)      
    }        
}

function prevPage(totalPage){    
    let getCurrentValue = document.getElementById("currentPage").value;
    let selectedPage = parseInt(getCurrentValue)    
    if((selectedPage > 1) && (selectedPage <= totalPage)) {                                
        updateCurrentPage = selectedPage - 1; 
        selectedValue = document.getElementById("currentPage").value = updateCurrentPage; 
        getPaginationData(selectedValue)
    }
}

// function getProductList(){    
//     fetch('https://api-generator.retool.com/BsUw6I/data?_page=1&_limit=10').then(function(response) {                
//     return response.json();
//     }).then(function(data) {
//        productList(data);       
//     }).catch(function(error) {
//         console.log(error, "Get Product list error");
//     });
     
//     // ecartStore = JSON.parse(localStorage.getItem('eStore'));
    
//     // let str = "";

//     // ecartStore.forEach(element => {
//     //     str += `
//     //     <div class="card m-3" style="width: 18rem;">
//     //         <img src="${element.product_image}" width="100" class="card-img-top" alt="...">
//     //         <div class="card-body">
//     //             <h5 class="card-title">${element.productName}</h5>
//     //             <p class="card-text">${element.description}</p>
//     //             <p class="card-text">Price: ${element.productPrice}</p>
//     //             <button onclick="addToCart()" class="btn btn-primary">add to cart</button>
//     //         </div>
//     //     </div>
//     //     `
//     //     document.getElementById("product").innerHTML = str;
//     // });    

//     // let categorylist = "";
//     // ecartStore.forEach(element => {
//     //     categorylist += `
//     //     <ul class="list-group list-group-flush">
//     //         <li class="list-group-item mb-2"><a href="">${element.product_category}</a></li>
//     //     </ul>
//     //     `
//     // })

//     // document.getElementById("showCategory").innerHTML = categorylist;
// }

function productList(loadData){
    let str = "";    
    const noImage = 'https://www.phswarnerhoward.co.uk/assets/images/no_img_avaliable.jpg';
    loadData.forEach((element, index) => {        
        str += `
        <div class="card m-3 position-relative" style="width: 18rem;" id="maindiv-${index}">
            <a href="javascript:void(0)" onclick="prodcutDetailId(${element.id})">
                <img src="${element.product_image ? element.product_image : noImage}" width="100" class="card-img-top" alt="...">
            </a>
            <div class="card-body">
                <h5 id="prod-name-${index}" class="card-title">${element.product_name}</h5>
                <p class="card-text">${element.description}</p>
                <p class="card-text">Price: ${element.product_price}</p>
                <p>Category: ${element.product_category}</p>
                <button onclick="addToCart(${element.id})" class="btn btn-primary">add to cart</button>
                

                <button onclick="deleteProductBtn(${element.id})" class="btn border-0 m-0 p-0 position-absolute top-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>

                <button class="btn border-0 mx-4 p-0 position-absolute" onclick="editProduct(${element.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
            </div>            
        </div>
        `
        document.getElementById("product").innerHTML = str;
    });
}

// Get Product detail Page
function prodcutDetailId(proDetailId){

    let proDetailBlock = "";

    $(document).ready(function(){
        fetch('https://api-generator.retool.com/BsUw6I/data/' + proDetailId).then(function(response){
            return response.json();
        }).then(function(getProdDetailPage){
            
            document.getElementById("product").style.display = "none";
            document.getElementById("showCategory").style.display = "block";

            proDetailBlock += `
                <div class="col-md-6">                                        
                    <img style="width:350px" src="${getProdDetailPage.product_image}" alt="" />
                </div>

                <div class="col-md-6">
                    <h2>${getProdDetailPage.product_name}</h2>
                    <p>${getProdDetailPage.description}</p>
                    <p>${getProdDetailPage.product_price}</p>
                    <button class="btn btn-primary">Add to cart</button>
                </div>
            `            
            document.getElementById("productDetails").innerHTML = proDetailBlock;
        })
    })
}

function backToProductList(){
    document.getElementById("showCategory").style.display = "none";
    document.getElementById("product").style.display = "flex";
}

function addToWhishlist(){
    alert('sdfsdf')
}

function searchItem(){
    let proSrc = document.getElementById("product_search").value;                
    let findProduct = proSrc.charAt(0).toUpperCase() + proSrc.slice(1);
    // let carIteam = document.getElementsByClassName('card');    
    
    if(proSrc){
        fetch('https://api-generator.retool.com/BsUw6I/data?product_name=' + findProduct, {
        method: 'GET',
        }).then(function(response){
            return response.json();            
        }).then(function(searchData){   
            productList(searchData);         
            // if(searchData.length > 0){
            //     productList(searchData);
            //     console.log('working')
            // } else {
            //     document.getElementById("product").style.display = 'none';
            //     document.getElementById("nomatch").innerHTML = 'No match found ';
            //     console.log('no data match')
            //     console.log(searchData.length, 'search lenth')
            // }
        })   
     }
    else {        
        document.getElementById("product").style.display ='flex';
        document.getElementById("nomatch").style.display = 'none';
        getDataForPag();
    }

    // if(proSrc) {
    //     for(let i = 0; i<carIteam.length; i++){        
    //          let dd = document.getElementById('prod-name-'+i).innerText;        
    //         if(proSrc == dd) {
    //             document.getElementById('maindiv-'+i).style.display = "flex";
    //         }
    //         else {
    //             document.getElementById('maindiv-'+i).style.display = "none";
    //         }
    //     }
    // }
    // else{
    //     for(let i = 0; i<carIteam.length; i++){        
    //         document.getElementById('maindiv-'+i).style.display = "flex";        
    //     }
    // }   
}


// Add to Cart Function
function addToCart(product_id){    
    let proName, proPrice, proDesc, proCat, proImg, proId

    fetch(url +'/data/' + product_id).then(function(response) {
    return response.json();
    }).then(function(addToCartData) {
        proName = addToCartData.product_name;
        proPrice = addToCartData.product_price;
        proDesc = addToCartData.product_category;
        proCat = addToCartData.description;
        proImg = addToCartData.product_image;
        proId = addToCartData.id;

        addProDetail = {proName, proPrice, proDesc, proCat, proImg, proId}        
    }).then(function(){
        $.post(cartUrl,
        {
            proId, proCat, proImg, proDesc, proName, proPrice, 
        },
        function(data, status){
            const message = document.getElementById("successMessage").innerHTML = "Product Added Successfully";
            console.log("Add to cart Data: " + data + "\nStatus: " + status);
        });
    }).catch(function(error) {
        console.log(error, "Product fatch error");
    });
}

function deleteProductBtn(deletedProId){    

    const confirmationModal = confirm('Are you sure, You want to delete it?')

    if(confirmationModal){
        fetch('https://api-generator.retool.com/BsUw6I/data/'+deletedProId,{
            method: 'DELETE'
        }).then(function(){
            getPaginationData()
        })   
    }    
}

function editProduct(id){
    document.getElementById("edit_product_form").style.display = "block";    
    document.getElementById("product").style.display = "none";
    fetch('https://api-generator.retool.com/BsUw6I/data/'+id,{
        method: 'get'
    }).then(function(response){
        return response.json();
    }).then(function(productData){        
        const productName = productData.product_name;
        const productDescription = productData.description;
        const productCat = productData.product_category;
        const productPrice = productData.product_price;
        const productImg = productData.product_image;
        
        document.getElementById("productName").value = productName;
        document.getElementById("productPrice").value = productPrice;
        document.getElementById("description").value = productDescription;
        document.getElementById("category").value = productCat;
        document.getElementById("product_image").value = productImg;
    })
}

document.getElementById("edit_product_form").style.display = "none";