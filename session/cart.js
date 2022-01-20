let cartList = JSON.parse(sessionStorage.getItem("carts"))

let list = '';

for(let i=0;i<cartList.length;i++){
    list += `<div class="row">
        <div id="name">${cartList[i].name}</div>
        <div id="qty">${cartList[i].qty}</div>
    </div>`;
}
document.getElementById("list-cart").innerHTML = list;