let cartList = [];

function addToCart(name,qty){
    const indexItem = cartList.findIndex(data => data.name === name)
    if(indexItem > -1){
        cartList[indexItem].qty += 1
    }else{
        cartList.push({
            name,
            qty
        });
    }
    sessionStorage.setItem("carts", JSON.stringify(cartList))
}

function removeFromCart(name){
    const indexItem = cartList.findIndex(data => data.name === name);
    if(indexItem > -1){
        if(cartList[indexItem].qty > 1){
            cartList[indexItem].qty -= 1
        }else{
            cartList.splice(indexItem, 1)
        }
    }
    sessionStorage.setItem("carts",JSON.stringify(cartList))
}

function emptyCart(){
    sessionStorage.removeItem("carts")
    cartList = [];
}