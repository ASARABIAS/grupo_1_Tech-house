
window.addEventListener('load', () => {
    const nextProductsWithoutDiscount = document.querySelector('#nextProductsWithoutDiscount');
    const previousProductsWithoutDiscount = document.querySelector('#previousProductsWithoutDiscount');
    const productsWithoutDiscount = document.querySelector('#productsWithoutDiscount');
    const articulos = [productsWithoutDiscount.children[1],productsWithoutDiscount.children[2],productsWithoutDiscount.children[3],productsWithoutDiscount.children[4]];

    let page = 1;
    let products = [];
    let pages = {};

    const Api = async (index) => {
        const response = await fetch(`http://localhost:3030/api/products?page=${page}&discount=0&itemsperpage=${index}`);
            const data = await response.json();
            products = data.products;
            pages = data.pages;

        if (!pages.next) {
            nextProductsWithoutDiscount.disabled = true;
            nextProductsWithoutDiscount.classList.add('disabled');
            nextProductsWithoutDiscount.classList.remove('enabled');
        }else{
            nextProductsWithoutDiscount.disabled = false;
            nextProductsWithoutDiscount.classList.remove('disabled');
            nextProductsWithoutDiscount.classList.add('enabled');
        }

        if (!pages.previous) {
            previousProductsWithoutDiscount.disabled = true;
            previousProductsWithoutDiscount.classList.add('disabled');
            previousProductsWithoutDiscount.classList.remove('enabled');
        }else{
            previousProductsWithoutDiscount.disabled = false;
            previousProductsWithoutDiscount.classList.remove('disabled');
            previousProductsWithoutDiscount.classList.add('enabled');
        }
    }

    Api(4);

    const loadingArticulo =(next) => {
        const product= products[0];
        if(next){
            for (let i = 0; i <4; i++) {
                if(i!==3){
                    articulos[i].innerHTML=articulos[i+1].innerHTML;
                }else{
                    articulos[i].children[0].innerHTML=` <a href="/products/detail/${product.id} "><img src="../images/products/${product.image.split('/').pop()}" alt="portatil" class="product_img"></a>`;
                    articulos[i].children[1].children[0].innerHTML=product.name;
                    articulos[i].children[1].children[1].innerHTML="$"+product.price;
                    articulos[i].children[1].children[2].innerHTML=product.shipping!=0 ? "$"+product.shipping : 'Gratis';
                }
            }
        }else{
            for (let i = 3; i >=0; i--) {
                if(i!==0){
                    articulos[i].innerHTML=articulos[i-1].innerHTML;
                }else{
                    articulos[i].children[0].innerHTML=` <a href="/products/detail/${product.id} "><img src="../images/products/${product.image.split('/').pop()}" alt="portatil" class="product_img"></a>`;
                    articulos[i].children[1].children[0].innerHTML=product.name;
                    articulos[i].children[1].children[1].innerHTML="$"+product.price;
                    articulos[i].children[1].children[2].innerHTML=product.shipping!=0 ? "$"+product.shipping : 'Gratis';
                }
            }
        }
    }

    nextProductsWithoutDiscount.addEventListener('click', (event) => {
        if(Object.keys(pages).length > 0) {
            page=page+4;
            Api(1)
            .then(() => {
                loadingArticulo(true);
            })
            
        }
    });

    previousProductsWithoutDiscount.addEventListener('click', (event) => {
        if(Object.keys(pages).length > 0) {
            page=page-4;
            Api(1)
            .then(() => {
                loadingArticulo(false);
            })
            
        }
    });
    //console.log(productsWithoutDiscount.children[0].children[1].children[0].innerHTML='Abraham 😎😎👍');

    const nextProductsWithDiscount = document.querySelector('#nextProductsWithDiscount');
    const previousProductsWithDiscount = document.querySelector('#previousProductsWithDiscount');
    const productsWithDiscount = document.querySelector('#productsWithDiscount');
    const articulosWithDiscount = [productsWithDiscount.children[1],productsWithDiscount.children[2],productsWithDiscount.children[3],productsWithDiscount.children[4]];

    let pageWithDiscount = 1;
    let productsDiscount = [];
    let pagesWithDiscount = {};

    const ApiWithDiscount = async (index) => {
        const response = await fetch(`http://localhost:3030/api/products?page=${pageWithDiscount}&discount=1&itemsperpage=${index}`);
            const data = await response.json();
            productsDiscount = data.products;
            pagesWithDiscount = data.pages;

        if (!pagesWithDiscount.next) {
            nextProductsWithDiscount.disabled = true;
            nextProductsWithDiscount.classList.add('disabled');
            nextProductsWithDiscount.classList.remove('enabled');
        }else{
            nextProductsWithDiscount.disabled = false;
            nextProductsWithDiscount.classList.remove('disabled');
            nextProductsWithDiscount.classList.add('enabled');
        }

        if (!pagesWithDiscount.previous) {
            previousProductsWithDiscount.disabled = true;
            previousProductsWithDiscount.classList.add('disabled');
            previousProductsWithDiscount.classList.remove('enabled');
        }else{
            previousProductsWithDiscount.disabled = false;
            previousProductsWithDiscount.classList.remove('disabled');
            previousProductsWithDiscount.classList.add('enabled');
        }
    }

    ApiWithDiscount(4);

    const loadingArticuloWithDiscount =(next) => {
        const product= productsDiscount[0];
        if(next){
            for (let i = 0; i <4; i++) {
                if(i!==3){
                    articulosWithDiscount[i].innerHTML=articulosWithDiscount[i+1].innerHTML;
                }else{
                    articulosWithDiscount[i].children[0].innerHTML=` <a href="/products/detail/${product.id} "><img src="../images/products/${product.image.split('/').pop()}" alt="portatil" class="product_img"></a>`;
                    articulosWithDiscount[i].children[1].children[0].innerHTML=product.name;
                    articulosWithDiscount[i].children[1].children[1].innerHTML="$"+product.price;
                    articulosWithDiscount[i].children[1].children[2].innerHTML=product.shipping!=0 ? "$"+product.shipping : 'Gratis';
                }
            }
        }else{
            for (let i = 3; i >=0; i--) {
                if(i!==0){
                    articulosWithDiscount[i].innerHTML=articulosWithDiscount[i-1].innerHTML;
                }else{
                    articulosWithDiscount[i].children[0].innerHTML=` <a href="/products/detail/${product.id} "><img src="../images/products/${product.image.split('/').pop()}" alt="portatil" class="product_img"></a>`;
                    articulosWithDiscount[i].children[1].children[0].innerHTML=product.name;
                    articulosWithDiscount[i].children[1].children[1].innerHTML="$"+product.price;
                    articulosWithDiscount[i].children[1].children[2].innerHTML=product.shipping!=0 ? "$"+product.shipping : 'Gratis';
                }
            }
        }
    }

    nextProductsWithDiscount.addEventListener('click', (event) => {
        if(Object.keys(pagesWithDiscount).length > 0) {
            pageWithDiscount=pageWithDiscount+4;
            ApiWithDiscount(1)
            .then(() => {
                loadingArticuloWithDiscount(true);
            })
            
        }
    });

    previousProductsWithDiscount.addEventListener('click', (event) => {
        if(Object.keys(pagesWithDiscount).length > 0) {
            pageWithDiscount=pageWithDiscount-4;
            ApiWithDiscount(1)
            .then(() => {
                loadingArticuloWithDiscount(false);
            })
            
        }
    });
    

})