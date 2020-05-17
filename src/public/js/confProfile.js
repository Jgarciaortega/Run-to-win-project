/* Funciones Servidor */
async function putServer(url, newValue) {

    let body = {
        method: 'PUT',
        body: JSON.stringify(newValue),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, body);
    const data = await res.json();

    return data;
}

/* Funciones Validacion Campos */
function validEmail(email) {

    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid = true;

    if (email.value.length == 0) {
        showError(email.getAttribute('name'), 'Debe rellenar este campo');
        isValid = false;
    }
    else if (!emailRegex.test(email.value)) {
        showError(email.getAttribute('name'), 'Formato de email incorrecto');
        isValid = false;
    }

    return isValid;
}

function validSex(sexo) {

    if (sexo.value == '') {

        showError(sexo.getAttribute('name'), 'Debe rellenar este campo');
        return false;
    }
    else return true;
}

function validAge(edad) {

    let isValid = true;
 
    if (edad.value == '') {

        showError(edad.getAttribute('name'), 'Debe rellenar este campo');
        isValid = false;
    }

    else if (isNaN(edad.value)) {

        showError(edad.getAttribute('name'), 'Este campo debe ser un número');
        isValid = false;

    }

    else if (edad.value > 150) {

        showError(edad.getAttribute('name'), 'Edad no válida');
        isValid = false;
    }

    return isValid;

}

function validWeight(peso) {

    let isValid = true;

    if (peso.value == '') {

        showError(peso.getAttribute('name'), 'Debe rellenar este campo');
        isValid = false;
    }

    else if (isNaN(parseFloat(peso.value))) {

        showError(peso.getAttribute('name'), 'Este campo debe ser un número');
        isValid = false;

    }

    return isValid;

}

function validHeight(altura) {

    let isValid = true;

    if (altura.value == '') {

        showError(altura.getAttribute('name'), 'Debe rellenar este campo');
        isValid = false;
    }

    else if (isNaN(parseFloat(altura.value))) {

        showError(altura.getAttribute('name'), 'Este campo debe ser un número');
        isValid = false;

    }

    return isValid;
}

function validPulsations(pulsaciones) {

    let isValid = true;

    if (pulsaciones.value == '') {

        showError(pulsaciones.getAttribute('name'), 'Debe rellenar este campo');
        isValid = false;
    }

    else if (isNaN(parseInt(pulsaciones.value))) {

        showError(pulsaciones.getAttribute('name'), 'Este campo debe ser un número');
        isValid = false;

    }

    return isValid;

}

function deleteErrorMsg() {

    let nameElement = 'error-' + this.getAttribute('id');
    let errorElement = document.getElementById(nameElement);
    errorElement.innerHTML = '';
    this.classList.remove('error');
}

function showError(inputName, message) {

    const msg = document.getElementById('error-' + inputName);

    msg.innerHTML =
        '<i class="fas fa-exclamation-triangle"  class="msgError noVisible"></i>' +
        '<span>' + message + '</span>';
    msg.classList.remove('noVisible');

    if (inputName != 'sexo') {

        const input = document.querySelector('input[name="' + inputName + '"]');
        input.classList.add('error');

    } else {

        const option = document.getElementById('sexo');
        option.classList.add('error');
    }
}

function saveChanges() {

    let elements = [];
    let validationOk = true;

    const sexo = document.getElementById('sexo');
    const edad = document.querySelector('input[name="edad"]');
    const email = document.querySelector('input[name="email"]');
    const peso = document.querySelector('input[name="peso"]');
    const altura = document.querySelector('input[name="altura"]');
    const pulsaciones = document.querySelector('input[name="pulsaciones_reposo"]');

    if (validSex(sexo)) elements.push(sexo);
    else validationOk = false;

    if (validAge(edad)) elements.push(edad);
    else validationOk = false;

    if (validEmail(email)) elements.push(email);
    else validationOk = false;

    if (validWeight(peso)) elements.push(peso);
    else validationOk = false;

    if (validHeight(altura)) elements.push(altura);
    else validationOk = false;

    if (validPulsations(pulsaciones)) elements.push(pulsaciones);
    else validationOk = false;

    if (validationOk) modifyField(elements);

}

function modifyField(elements) {

    let saved = true;

    elements.forEach(element => {

        let name = element.getAttribute('name');
        let value = element.value;

        if (name == 'email' || name == 'sexo') value = '"' + value + '"';

        data = {
            name,
            value
        }

        let response = putServer('/user/updateUser/' + user.id, data);

        if (!response) saved = false;

    })

    if (saved) alert('Cambios guardados correctamente');
    else alert('Error al salvar cambios');

}

function loadInfoUser(user) {


    document.querySelector('input[name="nombre"]').value = user.nombre;
    document.querySelector('input[name="apellidos"]').value = user.apellidos;
    document.querySelector('input[name="nickname"]').value = user.nickname;
    document.querySelector('input[name="edad"]').value = user.edad;
    document.querySelector('input[name="email"]').value = user.email;
    document.querySelector('input[name="peso"]').value = user.peso;
    if (user.altura != null) document.querySelector('input[name="altura"]').value = user.altura.toFixed(2);
    document.querySelector('input[name="pulsaciones_reposo"]').value = user.pulsaciones;
    document.querySelector('input[name="challenge"]').value = user.reto;
    document.querySelector('input[name="puntuacion"]').value = user.puntuacion;
    document.querySelector('input[name="status"]').value = user.status;
    document.querySelector('option[value="' + user.sexo + '"]').setAttribute('selected', 'true');

}

async function init() {

    //Obtenemos el id del usuario
    userId = JSON.parse(localStorage.getItem('user'));
    user = await getServer('/user/findById/' + userId.id);

    loadInfoUser(user);

    // listener inputs (solo para chequear si el input tine error)
    const elements = document.querySelectorAll('input');
    elements.forEach(element => {
        element.addEventListener('blur', deleteErrorMsg);
    })
    document.getElementById('sexo').addEventListener('blur', deleteErrorMsg);

    // listener save changes
    document.getElementById('btnPersonalData').addEventListener('click', saveChanges);

}

window.addEventListener('load', init);