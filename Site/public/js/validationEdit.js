const form = document.querySelector('form.infor-product');
const inputImage = document.querySelector('#productImage');
const inputName = document.querySelector('#name');
const inputSpecification = document.querySelector('#specifications');
const spanImage = document.querySelector('#errorProductImage');
const spanName = document.querySelector('#errorName');
const spanSpecification = document.querySelector('#errorSpecifications');

form.addEventListener('submit', (event) => {
    
    clear();
    
    if (inputName.value.length < 5) spanName.innerText = 'El nombre es muy corto';
    if (inputSpecification.value.length < 20) spanSpecification.innerText = 'Las Especificaciones es muy corta';

    if (spanName.innerText.length > 0 || spanSpecification.innerText.length > 0) event.preventDefault();
});

function clear() {
    spanName.innerText = "";
    spanImage.innerText = "";
    spanSpecification.innerText = "";
}