//Validations for create and edit product
const form = document.querySelector('form.infor-product');
const inputImage = document.querySelector('#productImage');
const inputName = document.querySelector('#name');
const inputSpecification = document.querySelector('#specifications');
const spanImage = document.querySelector('#errorProductImage');
const spanName = document.querySelector('#errorName');
const spanSpecification = document.querySelector('#errorSpecifications');

form.addEventListener('submit', (event) => {
    console.log("Imagen: ",inputImage.value);
    
    const ext = (inputImage.value.length > 0) ? inputImage.value.split(".").pop() : "none";

    clear();
    

    if (!(ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif')) spanImage.innerText = `La estencion ${ext} no es valida; Las extenciones validas son: jpg, jpeg, png, gif `;
    if (inputName.value.length < 5) spanName.innerText = 'El nombre es muy corto';
    if (inputSpecification.value.length < 20) spanSpecification.innerText = 'Las Especificaciones es muy corta';

    if (spanName.innerText.length > 0 || spanImage.innerText.length > 0 || spanSpecification.innerText.length > 0) event.preventDefault();
});

function clear() {
    spanName.innerText = "";
    spanImage.innerText = "";
    spanSpecification.innerText = "";
}