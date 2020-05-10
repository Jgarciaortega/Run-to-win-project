/* Funciones Generales */
function clearNode(elemento) {

    if (elemento.hasChildNodes()) {

        while (elemento.childNodes.length >= 1) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

/* Funciones Servidor */
async function postServer(url, data) {

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

async function getServer(url) {

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

async function deleteServer(url) {

    let body = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, body);
    const data = await res.json();

    return data;

}

/* Funciones Amigos */
async function findNewFriends() {

    const letters = this.value;
    const mainContainer = document.getElementById('searchResults');

    clearNode(mainContainer);

    if (letters.length > 0) {

        const friends = await getServer('/user/findByLetters/' + letters);

        if (friends.length) {
            mainContainer.classList.remove('noVisibility');

            for (friend of friends) {

                const nameContainer = document.createElement('div');
                nameContainer.classList.add('name');
                nameContainer.setAttribute('data-id', friend.id);
                nameContainer.addEventListener('click', requestFriendship);
                mainContainer.appendChild(nameContainer);

                const name = document.createElement('p');
                name.innerHTML = friend.nombre + " " + friend.apellidos;
                nameContainer.appendChild(name);

            }

        }

    } else {

        mainContainer.classList.add('noVisibility');
    }
}

async function requestFriendship() {

    data = {
        contenido: 'Ha recibido una solicitud de amistad de ' + user.nickname,
        id_destinatario: this.getAttribute('data-id'),
        tipo: 'Amistad',
        id_remitente: user.id
    }

    const response = await postServer('/api/createNotification', data);

    if (response) alert('Petición de amistad enviada')
    else alert('La petición de amistad no se envió')
}

async function acceptFriendship() {

    const id_remitente = this.getAttribute('data-remitente');
    const data = {
        id1: id_remitente,
        id2: user.id
    }

    const response = await postServer('/user/createFriendship',data);

    if(response.msg === 'Amistad creada'){
        alert('Ya sois amigos');
        await deleteNotification(this.getAttribute('data-id'));
        document.getElementById(this.getAttribute('data-id')).classList.add('noVisible');
    } 
}
async function rejectFriendship() {

    const idRequest = this.getAttribute('data-id');
    const divRequest = document.getElementById(idRequest);
    const response = await deleteNotification(idRequest);
   
    if (response.msg === 'borrada') alert('Petición rechazada')

    divRequest.classList.add('noVisible');

}

/* Funciones Notificaciones */
async function getFriendRequest() {

    const notifications = await getServer('/api/getNotificationsByType/' + user.id + '/' + 'Amistad');

    const requestQuantity = document.getElementById('requestQnt');
    requestQuantity.innerHTML = notifications.length;
    const mainContent = document.getElementById('containerRequest');

    for (notification of notifications) {

        const request = document.createElement('div');
        request.classList.add('request');
        request.setAttribute('id', notification.id);
        mainContent.appendChild(request);

        const userPhoto = document.createElement('img');
        userPhoto.setAttribute('src', '/assets/user_photos/yo.jpg');
        userPhoto.setAttribute('alt', 'Foto usuario peticion amistad');
        request.appendChild(userPhoto);

        const infoRequest = document.createElement('div');
        infoRequest.classList.add('infoRequest');
        request.appendChild(infoRequest);

        const userData = document.createElement('div');
        userData.classList.add('userData');
        infoRequest.appendChild(userData);

        const name = document.createElement('p');
        name.innerHTML = 'JAVIER GARCIA PEREZ';
        userData.appendChild(name);

        const nickname = document.createElement('p');
        nickname.innerHTML = 'JAGAROCK';
        userData.appendChild(nickname);

        const buttonsRequest = document.createElement('div');
        buttonsRequest.classList.add('buttonsRequest');
        infoRequest.appendChild(buttonsRequest);

        const btnAccept = document.createElement('button');
        btnAccept.classList.add('btnRequest');
        btnAccept.classList.add('btnAccept');
        btnAccept.innerHTML = 'Confirmar';
        btnAccept.setAttribute('data-id', notification.id);
        btnAccept.setAttribute('data-remitente', notification.id_remitente);
        btnAccept.addEventListener('click', acceptFriendship);
        buttonsRequest.appendChild(btnAccept);

        const btnReject = document.createElement('button');
        btnReject.classList.add('btnRequest');
        btnReject.classList.add('btnReject');
        btnReject.setAttribute('data-id', notification.id);
        btnReject.innerHTML = 'Eliminar solicitud';
        btnReject.addEventListener('click', rejectFriendship);
        buttonsRequest.appendChild(btnReject);

    }
}

async function deleteNotification(id){

    const response = await deleteServer('/api/deleteNotification/' + id);
    return response;
}

async function init() {

    //1º obtenemos el id usuario 
    let localStorageInfo = JSON.parse(localStorage.getItem('user'));
    //2º con el id obtenemos el usario
    user = await getServer('/user/findById/' + localStorageInfo.id);

    // listener buscar amigo
    document.getElementById('finder').addEventListener('keyup', findNewFriends);

    getFriendRequest();

}

/* Variables Globales */
let user;

window.addEventListener('load', init);