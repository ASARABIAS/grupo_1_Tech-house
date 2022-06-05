//Validations for create and edit product
const form = document.querySelector('form');
const inputImage = document.querySelector('#productImage');
const inputName = document.querySelector('#name');
const inputSpecification = document.querySelector('#specifications');
const smallImage = document.querySelector('#errorProductImage');
const smallName = document.querySelector('#errorName');
const smallSpecification = document.querySelector('#errorSpecifications');

console.log('form: ', form);

form.addEventListener('submit', (event) => {

    event.preventDefault();
    alert("entro");

    const ext = (inputImage.value.length > 0) ? inputImage.value.split(".").pop() : "none";

    if (ext != 'jpg' || ext != 'jpeg' || ext != 'png' || ext != 'gif') aux(event, smallImage, `La estencion ${ext} no es valida; Extenciones valodas jpg, jpeg, png, gif `);
    if (inputName.value.length < 5) aux(event, smallName, 'El nombre es muy corto');
    if (inputSpecification.value.length < 20) aux(event, smallSpecification, 'Las Especificaciones es muy corta');

});

function aux(event, small, messenger) {
    small.innerText = messenger;
    return;
}