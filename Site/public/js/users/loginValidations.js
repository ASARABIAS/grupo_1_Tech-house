const loginForm = document.querySelector(".login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


loginForm.addEventListener("submit", (e) => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let emailErrors = [];
    let passwordErrors = [];


    if (emailValue == ''|| emailValue == null) {
    
        emailErrors.push("El campo de correo electrónico no puede estar vacio");
      }

    else if (!isEmail(emailValue)) {
        emailErrors.push("Debe escribir un formato de correo electrónico valido");
      }
      
    if(emailErrors.length > 0) {
        e.preventDefault();
        let ulErrors= document.querySelector(".mainlogin div.error ul");
        for( let i =0; i< emailErrors.length;i++){
          ulErrors.innerHTML += "<li>" +emailErrors[i]+ "</li>"
        }
        
      }
      if (passwordValue == ''|| passwordValue == null) {
    
        passwordErrors.push("El campo de contraseña no puede estar vacio");
      }

      if(passwordErrors.length > 0) {
        e.preventDefault();
        let ulErrors= document.querySelector(".passwordError div.error ul");
        for( let i =0; i< passwordErrors.length;i++){
          ulErrors.innerHTML += "<li>" +passwordErrors[i]+ "</li>"
        }
        
      }
})

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}