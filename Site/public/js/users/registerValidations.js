const registerForm = document.querySelector(".registro");
const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const country = document.querySelector("#country");
const nameErrors = document.querySelector("#nameError");
const emailErrors = document.querySelector("#emailErrors");
const passwordErrors = document.querySelector("#passwordError");
const countryErrors = document.querySelector("#countryError");
const avatarErrors = document.querySelector("#avatarError");

registerForm.addEventListener("submit", (e) => {
  
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const countryValue = country.value.trim();
  const avatarValue = avatar.value.trim();
  clear();
 

  if (userNameValue == "") {
    nameErrors.innerText = "El campo de nombre no puede estar vacío"}
  
  else if (userNameValue.length < 3) {
    nameErrors.innerText = "El nombre debe tener mínimo 2 caracteres";
  };

  if (emailValue == "") {
    emailErrors.innerText =
      "El campo de correo electrónico no puede estar vacío";
  }
  else if (!isEmail(emailValue)) {
    emailErrors.innerText =
      "Debe escribir un formato de correo electrónico validoo";
  };

  if (passwordValue == "") {
    passwordErrors.innerText = "El campo de contraseña no puede estar vacío";
  }
  else if (passwordValue.length < 8) {
    passwordErrors.innerText = "La contraseña debe tener mínimo 8 caracteres";
  }
  else if (!validPassword(passwordValue)) {
    passwordErrors.innerText =
      "La contraseña debe tener mínimo una letra mayúscula, una letra minúscula, un número y un carácter especial";
  };
  if (countryValue == "") {
    countryErrors.innerText = "El campo de país no puede estar vacío";
  };
  if (avatarValue !== "") {
    if (!validImage(avatarValue)) {
      avatarErrors.innerText =
        "Solo puede usar imágenes con los formatos: JPG, JPEG, PNG o GIF como su imagen de perfil";
    }};
if (
      nameErrors.innerText.length > 0 ||
      emailErrors.innerText.length > 0 ||
      passwordErrors.innerText.length > 0 ||
      countryErrors.innerText.length > 0 ||
      avatarErrors.innerText.length > 0
    )e.preventDefault();
  
});

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function validPassword(password) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
    password
  );
}

function validImage(image) {
  return /.*\.(gif|jpe?g|bmp|png)*$/.test(image);
}

function clear() {
  nameErrors.innerText = "";
  emailErrors.innerText = "";
  passwordErrors.innerText = "";
  countryErrors.innerText = "";
  avatarErrors.innerText = "";
}

  









  

