/* MÉTODOS CONEXION SERVIDOR */
async function putServer(url) {

    let body = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, body);
    const data = await res.json();

    return data;

}

async function getServer(url) {

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

async function saveChallenge() {

    const challenge = this.getAttribute('data');
    const res = await putServer('/user/saveChallenge/' + user.id + '/' + challenge);
   
    if(res) alert('Desafío guardado');
    else alert('Fallo al guardar el desafíio');

}

async function init() {

    //1º obtenemos el id usuario 
    let localStorageInfo = JSON.parse(localStorage.getItem('user'));
    //2º con el id obtenemos el usario
    user = await getServer('/user/findById/' + localStorageInfo.id);

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', saveChallenge));

}

//Variables Globales
let user;

window.addEventListener('load', init);