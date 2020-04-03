
/* Inicio funciones validacion */
const validateName = (name) => {

    const nameRegex = /^([A-ZÑÁÉÍÓÚ]+[\s]*)+$/
    let msg;

    if (!nameRegex.test(name)) {

        if (name.length == 0) msg = 'Debe rellenar este campo';
        else msg = 'Este campo solo puede contener letras';

    } else msg = 'ok';

    return msg;
}

const validateUsername = (username) => {
    //Alphanumeric string that may include _ and – having a length of 3 to 22 characters –
    const usernameRegex = /^[a-zñ0-9_-]{3,22}$/
    let msg;

    if (usernameRegex.test(username)) msg = 'ok';
    else {
        if (username.length == 0) msg = 'Debe rellenar este campo';
        else if (username.length < 3) msg = 'Este campo debe tener mínimo 3 carácteres';
        else msg = 'Este campo puede tener máximo 22 carácteres';
    };

    return msg;
}

const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let msg;

    if (email.length == 0) msg = 'Debe rellenar este campo';
    else if (!emailRegex.test(email)) msg = 'Formato de email incorrecto';
    else msg = 'ok';

    return msg;
}


const validateDni = (dni) => {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET'
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
    const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
    const str = dni.toString().toUpperCase()

    if (!nifRexp.test(str) && !nieRexp.test(str)) console.log('DNI incorrecto')

    const nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2')

    const letter = str.substr(-1)
    const charIndex = parseInt(nie.substr(0, 8)) % 23

    if (validChars.charAt(charIndex) === letter) console.log('DNI válido')

    console.log('DNI incorrecto')
}

const validateIban = (iban) => {
    const ibanRegex = /([A-Z]{2})\s*\t*(\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d)\s*\t*(\d\d\d\d\d\d\d\d\d\d)/g

    if (ibanRegex.test(iban)) console.log('iban válido')
    else console.log('iban incorrecto')
}

const validatePasswordComplex = (password) => {
    //Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
    const passwordRegex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    if (passwordRegex.test(password)) console.log('password válido')
    else console.log('password incorrecto')
}

const validatePasswordModerate = (password) => {
    //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    let msg;

    if (password.length == 0) msg = 'Debe rellenar este campo';
    else if (passwordRegex.test(password)) msg = 'ok';
    else msg = 'La contraseña ha de contener al menos 8 carácteres, una minuscula, una mayuscula y un número';

    return msg;
}

const confirmPassword = (password1, password2) => {

    let msg;

    if (password1 == password2) msg = 'ok';
    else msg = 'Las contraseñas no coinciden';

    return msg;
}

const validateUrl = (url) => {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/
    if (urlRegex.test(url)) console.log('url válida')
    else console.log('url incorrecta')
}

const validateIP = (ip) => {
    const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g
    if (ipRegex.test(ip)) console.log('ip válida')
    else console.log('ip incorrecta')
}

const validateHexadecimal = (hexadecimal) => {
    const hexadecimalRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/
    if (hexadecimalRegex.test(hexadecimal)) console.log('hexadecimal válido')
    else console.log('hexadecimal incorrecto')
}

const validateCreditCard = (card) => {
    const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    if (creditCardRegex.test(card)) console.log('card válido')
    else console.log('card incorrecto')
}

/*Fin funciones validacion */

/* Variables globales */

let newUser = {
    nombre: "",
    apellidos: "",
    nickname: "",
    email: "",
    password: "",
    passwordCheck: ""

};

function dataResgistry() {

    let inputName = this.attributes[1].nodeValue;
    let inputContent = this.value;
    switch (inputName) {

        case "nombre":
            verifyData(validateName, inputContent.toUpperCase(), inputName);
            break;

        case "apellidos":
            verifyData(validateName, inputContent.toUpperCase(), inputName);
            break;

        case "nickname":
            verifyData(validateUsername, inputContent, inputName);
            break;

        case "email":
            verifyData(validateEmail, inputContent, inputName);
            break;

        case "passwordRegistry":
            verifyData(validatePasswordModerate, inputContent, inputName);
            break;

        case "passwordCheck":
            verifyData(validatePasswordModerate, inputContent, inputName);
            break;
    }
}

function verifyData(funcion, inputContent, inputName) {

    let message = funcion(inputContent);
    let messagePass;

    //si el dato es erroneo se muestra error
    if (message != 'ok') {

        showError(inputName, message);

        //inicializamos el atributo del objeto por si tiene un dato previo
        if (inputName == 'nombre') newUser.nombre = "";
        else if (inputName == 'apellidos') newUser.apellidos = "";
        else if (inputName == 'nickname') newUser.nickname = "";
        else if (inputName == 'email') newUser.email = "";
        else if (inputName == 'passwordRegistry') newUser.password = "";
        else if (inputName == 'passwordCheck') newUser.passwordCheck = "";

    }

    else {

        //si el dato es correcto pero previamente habia error se elimina este
        const input = document.querySelector('input[name="' + inputName + '"]');
        const msg = document.getElementById('error-' + inputName);

        if (!msg.classList.contains('noVisible')) {

            msg.classList.add('noVisible');
            input.classList.remove('error');
        }

        //guardamos el dato en el objteto newUser
        if (inputName == 'nombre') newUser.nombre = inputContent;
        else if (inputName == 'apellidos') newUser.apellidos = inputContent;
        else if (inputName == 'nickname') newUser.nickname = inputContent;
        else if (inputName == 'email') newUser.email = inputContent;
        else if (inputName == 'passwordRegistry') {

            //si el input de confirmacion tiene password validamos que coincidan
            if (newUser.passwordCheck != "") {
                messagePass = Validate.confirmPassword(inputContent, newUser.passwordCheck);
                if (messagePass == 'ok') {
                    newUser.password = inputContent;
                } else showError(inputName, messagePass);

            } else {
                newUser.password = inputContent;
            }
        }

        else if (inputName == 'passwordCheck') {
            //si el input password tiene password validamos que coincidan
            if (newUser.password != "") {
                messagePass = confirmPassword(inputContent, newUser.password);
                if (messagePass == 'ok') {
                    newUser.passwordCheck = inputContent;
                } else showError(inputName, messagePass);
            } else {
                newUser.passwordCheck = inputContent;
            }

        }
    }

}

function showError(inputName, message) {

    const input = document.querySelector('input[name="' + inputName + '"]');
    const msg = document.getElementById('error-' + inputName);

    msg.innerHTML =
        '<i class="fas fa-exclamation-triangle"  class="msgError noVisible"></i>' +
        '<span>' + message + '</span>';
    msg.classList.remove('noVisible');
    input.classList.add('error');

}

async function createUser() {

    let validationOk = true;
    console.log(newUser);

    // Obteniendo todas las claves del objeto newUser para comprobar si hay errores
    for (let clave in newUser) {
        if (newUser.hasOwnProperty(clave)) {
            if (newUser[clave] == "") {
                alert('Hay errores en los campos de registro');
                validationOk = false;
                break;
            }
        }
    }
    //si no hay errores en el formulario comprobamos:
    if (validationOk) {

        //1º ¿Existe email?
        let urlEmail = '/user/existEmail';
        let response = await sendToServer(urlEmail, newUser);

        if (response.msg == true) {
            showError('email', 'Este email ya está registrado')
            validationOk = false;
        }
        //2º ¿Existe nickname?
        let urlNickname = '/user/existNickname';
        response = await sendToServer(urlNickname, newUser);

        if (response.msg == true) {
            showError('nickname', 'Este usuario ya está registrado')
            validationOk = false;
        }
        //3º Si todo ok registramos al usuario
        let urlCreate = '/user/createUser';
        console.log(validationOk);

        if (validationOk) {

            sendToServer(urlCreate, newUser);
        }

    }
}

function askToServer(url, data) {


}

async function sendToServer(url, data) {

    let body = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res1 = await fetch(url, body);
    const res2 = await res1.json();

    return res2;

}

async function login() {

    let user = document.querySelector('input[name="userLogin"]').value;
    let pass = document.querySelector('input[name="passwordLogin"]').value;
    let url = '../user/isValidUser';

    let userLogin = {
        nickname: user,
        password: pass
    }

    console.log(await sendToServer(url, userLogin));
    // location.href="/profile";

}

function init() {

    /* Elements Login */
    let inputLogin = document.querySelector('input[name="userLogin"]');
    let inputLoginPass = document.querySelector('input[name="passwordLogin"]');
    let btnLogin = document.querySelector('input[name="btnlogin"]');

    /* Elements Registry */
    let inputName = document.querySelector('input[name="nombre"]');
    let inputApellidos = document.querySelector('input[name="apellidos"]');
    let inputNickname = document.querySelector('input[name="nickname"]');
    let inputEmail = document.querySelector('input[name="email"]');
    let inputPassRegistry = document.querySelector('input[name="passwordRegistry"]');
    let inputPassCheck = document.querySelector('input[name="passwordCheck"]');
    let btnRegistry = document.querySelector('input[name="btnregistro"]');
    
    /* Init listener login */
    btnLogin.addEventListener('click', login);

    /* Init listeners register */
    inputName.addEventListener('blur', dataResgistry);
    inputApellidos.addEventListener('blur', dataResgistry);
    inputNickname.addEventListener('blur', dataResgistry);
    inputEmail.addEventListener('blur', dataResgistry);
    inputPassRegistry.addEventListener('blur', dataResgistry);
    inputPassCheck.addEventListener('blur', dataResgistry);
    btnRegistry.addEventListener('click', createUser);

    /* Reset values */
    inputLogin.value='';
    inputLoginPass='';
    inputName.value='';
    inputApellidos.value='';
    inputNickname.value='';
    inputEmail.value='';
}

window.addEventListener('load', init);