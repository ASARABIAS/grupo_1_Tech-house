
window.onload = () => {
    const addToCart = document.querySelector(".btn-add");
    addToCart.addEventListener("click", function(e){
        e.preventDefault();
        const quantityInput = document.querySelector("#quantity");
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);
        const userId = document.getElementById("userId").value;
        
        let cart = {
            userId: userId,
            products: [],
        }
        let existentCart = localStorage.getItem("cart")
        if(existentCart){
            let cartInfo = JSON.parse(existentCart);
            let existingProduct = cartInfo.products.filter(product => {
                return product.idProduct == id
            })

            if(existingProduct.length > 0){
                cartInfo.products.forEach((product) => {
                    if(product.idProduct == id){
                        product.quantity += parseInt(quantityInput.value)
                        return;
                    }
                })
            }else{
                cartInfo.products = [...cartInfo.products, {idProduct: id, quantity: parseInt(quantityInput.value)}]
            }
            localStorage.setItem("cart", JSON.stringify(cartInfo))
        }else{
            cart.products.push({
                idProduct: id,
                quantity: parseInt(quantityInput.value)
            })
            localStorage.setItem("cart", JSON.stringify(cart))
        } 
    })
    
}