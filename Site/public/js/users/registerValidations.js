const registerForm = document.querySelector(".registro");
const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const country = document.querySelector("#country");


registerForm.addEventListener("submit", (e) => {
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const countryValue = country.value.trim();
  const avatarValue = avatar.value.trim();
  let nameErrors = [];
  let emailErrors = [];
  let passwordErrors = [];
  let countryErrors =[];
  let avatarErrors = [];

  if (userNameValue == ''|| userNameValue == null) {
    
    nameErrors.push("El nombre no puede estar vacio");
  }
  else if(userNameValue.length <3){
    nameErrors.push("El nombre debe tener mínimo 2 caracteres");
  };
if(nameErrors.length > 0) {
  e.preventDefault();
  let ulErrors= document.querySelector(".registerName div.error ul");
  for( let i =0; i< nameErrors.length;i++){
    ulErrors.innerHTML += "<li>" +nameErrors[i]+ "</li>"
  }
  
}

if (emailValue == ''|| emailValue == null) {
    
  emailErrors.push("El campo de correo electrónico no puede estar vacio");
}

else if (!isEmail(emailValue)) {
  emailErrors.push("Debe escribir un formato de correo electrónico valido");
}

if(emailErrors.length > 0) {
  e.preventDefault();
  let ulErrors= document.querySelector(".registerEmail div.error ul");
  for( let i =0; i< emailErrors.length;i++){
    ulErrors.innerHTML += "<li>" +emailErrors[i]+ "</li>"
  }
  
}
if (passwordValue == ''|| passwordValue == null) {
    
  passwordErrors.push("El campo de contraseña no puede estar vacio");
}

else if(passwordValue.length <8){
  passwordErrors.push("El nombre debe tener mínimo 8 caracteres");
}

else if (!validPassword(passwordValue)) {
  passwordErrors.push("Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial");
}

if(passwordErrors.length > 0) {
  e.preventDefault();
  let ulErrors= document.querySelector(".registerPassword div.error ul");
  for( let i =0; i< passwordErrors.length;i++){
    ulErrors.innerHTML += "<li>" +passwordErrors[i]+ "</li>"
  }
  
}

if (countryValue == ''|| countryValue == null) {
    
  countryErrors.push("El campo de país no puede estar vacio");
}

if(countryErrors.length > 0) {
  e.preventDefault();
  let ulErrors= document.querySelector(".registerCountry div.error ul");
  for( let i =0; i< countryErrors.length;i++){
    ulErrors.innerHTML += "<li>" +countryErrors[i]+ "</li>"
  }
  
}
if(avatarValue){
if(!validImage(avatarValue) ){
  avatarErrors.push("Solo puede usar imagenes con los formatos: JPG, JPEG, PNG o GIF como su imagen de perfil")

}
}

if(avatarErrors.length > 0) {
  e.preventDefault();
  let ulErrors= document.querySelector(".registerAvatar div.error ul");
  for( let i =0; i< avatarErrors.length;i++){
    ulErrors.innerHTML += "<li>" +avatarErrors[i]+ "</li>"
  }
  
}

});

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function validPassword(password){
  return  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password);
}

function validImage(image){
  return /.*\.(gif|jpe?g|bmp|png)*$/.test(image);
}
    
  









  

