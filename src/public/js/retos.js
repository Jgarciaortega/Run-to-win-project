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

    if (res) {
        alert('Desafío guardado');
        //cargamos al usuario la rutina del desafio elegido
        setRutine(challenge);
    }
    else alert('Fallo al guardar el desafíio');

}

async function setRutine(challenge) {

    // get rutina 
    const res1 = await getServer('/api/findRutineByName/' + challenge);
    const id_rutina = res1[0].id;

    // modificamos la rutina del usuario
    const res2 = await putServer('/user/saveRutine/' + user.id + '/' + id_rutina);
   
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