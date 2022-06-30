
window.addEventListener('load', () => {
    const productsWithoutDiscount = document.querySelector('#productsWithoutDiscount');
    const nextProductsWithoutDiscount = document.querySelector('#nextProductsWithoutDiscount');
    const previousProductsWithoutDiscount = document.querySelector('#previousProductsWithoutDiscount');

    let page=1;
    let products = [];
    let pages = {};
    
    
    const Api=async()=>{
        const response = await fetch(`http://localhost:3030/api/products?page=${page}&discount=0&itemsperpage=1`);
        const data = await response.json();
        products=data.products;
        pages=data.pages;

        if(!pages.next) {
            nextProductsWithoutDiscount.disabled=true;
            nextProductsWithoutDiscount.classList.add('disabled');
        }
        if(!pages.previous){
            previousProductsWithoutDiscount.disabled=true;
            previousProductsWithoutDiscount.classList.add('disabled');
        }

        console.log(products);
        nextProductsWithoutDiscount.addEventListener('click', (event) => {

        });
    }

    Api();
    

    
    //console.log(productsWithoutDiscount.children[0].children[1].children[0].innerHTML='Abraham 😎😎👍');
    

})