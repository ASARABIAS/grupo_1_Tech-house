let productsInCar = []
window.onload = async () => {

    let cart = localStorage.getItem("cart")

    let clearCartButton = document.querySelector(".clearCart");
    clearCartButton.addEventListener("click", ()=>{
        if(cart){
            localStorage.removeItem("cart")
            window.location.reload(true);
        }
    });

    
    if(cart){
        let cartData = JSON.parse(cart)
        const response = await fetch("http://localhost:3030/products/cart", {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(cartData.products)
        })
        let productsDb = await response.json()

        productsInCar = productsDb.map(prod => {
            return {...prod, quantity: parseInt(cartData.products.find(p => p.idProduct == prod.id)?.quantity)}
        });

        generateCartHtml(productsInCar);
    }else{
        let productsContainer = document.querySelector("#productsContainer");
        productsContainer.innerHTML = "<div>No ha ingresado elementos al carrito aún</div>"
    }

    function generateCartHtml(productsInCar){
        
        let cartSummary = {
            products: productsInCar,
        };

        cartSummary.summary = {
            productsQuantity: cartSummary.products.reduce((total, prod) => {
                return total + parseInt(prod.quantity)
            }, 0),
            subtotal: cartSummary.products.reduce((total, prod) => {
                return total + prod.quantity * prod.price
            }, 0),
            shipping: cartSummary.products.reduce((total, prod) => {
                return total + prod.shipping
            }, 0)
        }

        cartSummary.summary.total =  cartSummary.summary.subtotal + cartSummary.summary.shipping;

        //assign values to summary order.
        const productQuantity = document.querySelector("#productQuantity");
        productQuantity.innerHTML = cartSummary.summary.productsQuantity;

        const subtotalAmount = document.querySelector("#subtotalAmount");
        subtotalAmount.innerHTML = "$" + Number(cartSummary.summary.subtotal).toLocaleString('es-ES'); 

        const shippingAmount = document.querySelector("#shippingAmount");
        shippingAmount.innerHTML = "$" + Number(cartSummary.summary.shipping).toLocaleString('es-ES'); 

        const totalAmount = document.querySelector("#totalAmount");
        totalAmount.innerHTML = "$" + Number(cartSummary.summary.total).toLocaleString('es-ES'); 

        let productsContainer = document.querySelector("#productsContainer");
        let productHtml = "";

        for (let i = 0; i < cartSummary.products.length; i++) { 
            productHtml = productHtml + 
            `<article class="product-info">
            <div class="product-info-container">
                <img src="/../images/products/${cartSummary.products[i].images[0].image}" width="100%">
                <div class="product-description-section">
                    <h3>${cartSummary.products[i].name}</h3>
                    <p class="product-avaliable">Disponible</p>
                    <p class="product-description">${cartSummary.products[i].specifications}.</p>
                    <p class="product-price">${"$" + Number(cartSummary.products[i].price).toLocaleString('es-ES')}</p>
                    <div class="product-delivery-info">
                        <p class="product-delivery"><i class="fas fa-truck"></i> Llega entre xxxxxx</p>
                        <p class="product-delivery"><i class="fa-solid fa-arrow-rotate-left"></i> Devolucion Gratis</p>
                    </div>
                </div>
                <div class="product-quantity">
                    <button type="button" class="decreaseQuantity" data-productId = ${cartSummary.products[i].id}>-</button>
                    <input type="number" class="prodQuantity" data-productId = ${cartSummary.products[i].id} value=${cartSummary.products[i].quantity}>
                    <button type="button" class="increaseQuantity" data-productId = ${cartSummary.products[i].id} >+</button>
                </div>
            </div>
            <div class="product-options">
                <button class="product-delete-button removeItem" data-productId = ${cartSummary.products[i].id} >Eliminar</button>
                <a href="#">Productos similares</a>
                <a href="#">Guardar para después</a>
            </div>
            </article>`;
        }

        productsContainer.innerHTML = productHtml;

        document.querySelectorAll(".removeItem").forEach(button => 
            button.addEventListener("click", function(e){
                removeProduct(e.target.dataset.productid)
            } )
          )

          document.querySelectorAll(".decreaseQuantity").forEach(button => 
            button.addEventListener("click", function(e){

                const inputQuantity = document.querySelector(`.prodQuantity[data-productid="${e.target.dataset.productid}"]`);

                if (parseInt(inputQuantity.value) == 1) {
                    return
                }
                
                updateQuantity(e.target.dataset.productid, -1)
            } )
          )
        
          document.querySelectorAll(".increaseQuantity").forEach(button => 
            button.addEventListener("click", function(e){
                updateQuantity(e.target.dataset.productid, 1)
            } )
          )
          
          document.querySelectorAll(".prodQuantity").forEach(input => 
            input.addEventListener("change", function(e){
                const value = e.target.value;

                if (value <= 0) {
                    return; 
                }

                updateQuantity(e.target.dataset.productid, value, true)
            } )
          )

          document.querySelectorAll(".removeItem").forEach(button => 
            button.addEventListener("click", function(e){
                removeProduct(e.target.dataset.productid)
            } )
          )
    }

    function removeProduct(prodId){
        productsInCar =  productsInCar.filter(pr => {
            return pr.id != prodId
        });

        if (productsInCar.length == 0) {
            localStorage.removeItem("cart")
            window.location.reload(true);
        }

        generateCartHtml(productsInCar)
        updateCartLocalStorage(productsInCar)
    }

    function updateQuantity(prodId, quantity, replace = false){
        productsInCar.forEach(prod => {
            if (prod.id == prodId) {
                prod.quantity = replace ? quantity : parseInt(prod.quantity) + parseInt(quantity);
                return
            }
        });

        generateCartHtml(productsInCar)
        updateCartLocalStorage(productsInCar)
    }

    function updateCartLocalStorage(productsUpdated){
        let storeCart = localStorage.getItem("cart")

        if (storeCart) {
            let cartInfo = JSON.parse(storeCart);
            cartInfo.products = productsUpdated.map(prod => {
                return {
                    idProduct: prod.id,
                    quantity: prod.quantity
                }
            });

            localStorage.setItem("cart", JSON.stringify(cartInfo))
        }
    }
}