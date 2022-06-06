//Validations for create and edit product
const form = document.querySelector('form.infor-product');
const inputImage = document.querySelector('#productImage');
const inputName = document.querySelector('#name');
const inputSpecification = document.querySelector('#specifications');
const smallImage = document.querySelector('#errorProductImage');
const smallName = document.querySelector('#errorName');
const smallSpecification = document.querySelector('#errorSpecifications');

form.addEventListener('submit', (event) => {
    const ext = (inputImage.value.length > 0) ? inputImage.value.split(".").pop() : "none";
    const exts = []
    clear();

    if (!(ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif')) smallImage.innerText = `La estencion ${ext} no es valida; Las extenciones validas son: jpg, jpeg, png, gif `;
    if (inputName.value.length < 5) smallName.innerText = 'El nombre es muy corto';
    if (inputSpecification.value.length < 20) smallSpecification.innerText = 'Las Especificaciones es muy corta';

    if (smallName.innerText.length > 0 || smallImage.innerText.length > 0 || smallSpecification.innerText.length > 0) event.preventDefault();
});

function clear() {
    smallName.innerText = "";
    smallImage.innerText = "";
    smallSpecification.innerText = "";
}