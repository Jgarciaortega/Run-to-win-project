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

/* Funciones Amigos */
async function createFriendship() {

    const id = user.id;

    data = {
        id1: id,
        id2: 2
    }

    await postServer('/user/createFriendship', data);

}

function requestFriendship(){
    console.log(this.getAttribute('data-id'));
}

async function loadFriends() {

    const friends = await getServer('/user/getFriends/' + user.id);

}

async function findFriend() {

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
                nameContainer.setAttribute('data-id',friend.id);
                nameContainer.addEventListener('click', requestFriendship );
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

async function init() {

    //1º obtenemos el id usuario 
    let localStorageInfo = JSON.parse(localStorage.getItem('user'));
    //2º con el id obtenemos el usario
    user = await getServer('/user/findById/' + localStorageInfo.id);

    // listener buscar amigo
    document.getElementById('finder').addEventListener('keyup', findFriend);

    // loadFriends();
    // createFriendship();

}

/* Variables Globales */
let user;

window.addEventListener('load', init);