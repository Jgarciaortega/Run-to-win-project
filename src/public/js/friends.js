/* Funciones Generales */
function clearNode(elemento) {

    if (elemento.hasChildNodes()) {

        while (elemento.childNodes.length >= 1) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

// primera letra palabra mayuscula el resto en minusculas
function modifyStyle(word) {

    let newWord = '';
    let char;
    let words = word.split(' ');

    for (let i = 0; i < words.length; i++) {

        for (let y = 0; y < words[i].length; y++) {

            char = words[i].charAt(y);
          
            if (y == 0) char.toUpperCase();
            else char = char.toLowerCase();

            newWord += char;
        }
    }
    
    return newWord;
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
async function getFriends(relationships) {

    let localFriends = [];

    for (relationship of relationships) {

        let friend_id;
        if (relationship.id1 == user.id) friend_id = relationship.id2;
        else friend_id = relationship.id1;

        let userFriend = await getServer('/user/findById/' + friend_id);
        localFriends.push(userFriend);
    }

    // ordeno el listado alfabeticamente segun su atributo nombre
    localFriends.sort(function (a, b) {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }

        return 0;
    })

    return localFriends;
}

async function loadFriends(userFriends) {

    const mainContainer = document.getElementById('containerFriends');
    clearNode(mainContainer);
   
    for (userFriend of userFriends) {

        const contentFriend = document.createElement('div');
        contentFriend.classList.add('friend');
        mainContainer.appendChild(contentFriend);

        const photoFriend = document.createElement('img');
        photoFriend.setAttribute('src', userFriend.imagen);
        photoFriend.setAttribute('alt', 'Imagen amigo');
        contentFriend.appendChild(photoFriend);

        const infoFriend = document.createElement('div');
        infoFriend.classList.add('infoFriend');
        contentFriend.appendChild(infoFriend);

        const name = document.createElement('p');
        name.classList.add('name');
        name.innerHTML = userFriend.nombre + " " + userFriend.apellidos;
        infoFriend.appendChild(name);

        const nickname = document.createElement('p');
        nickname.innerHTML = userFriend.nickname;
        infoFriend.appendChild(nickname);

        const buttons = document.createElement('div');
        buttons.classList.add('sendButton')
        contentFriend.appendChild(buttons);
        
        const sendMsg = document.createElement('button');
        sendMsg.innerHTML = 'Enviar mensaje';
        sendMsg.setAttribute('data-id', userFriend.id);
        sendMsg.setAttribute('name', userFriend.nombre);
        sendMsg.setAttribute('surname', userFriend.apellidos);
        sendMsg.addEventListener('click', sendMessage);
        buttons.appendChild(sendMsg);
    }

}

function sendMessage() {

    //1º Centramos la ventana
    const windowNewMsg = document.getElementById('newMessage');
    const altura = 225;
    const anchura = 470;

    let y = parseInt((window.screen.height / 2) - (altura / 2));
    let x = parseInt((window.screen.width / 2) - (anchura / 2));

    windowNewMsg.style.top = y + 'px';
    windowNewMsg.style.left = x + 'px';

    //2º Remove class noVisible
    document.getElementById('newMessage').classList.remove('noVisible');

    //3º Destinatario mensaje
    const para = document.querySelector('input[name="addressee"]');
    let name = this.getAttribute('name');
    let surname = this.getAttribute('surname');
    name = modifyStyle(name);
    surname = modifyStyle(surname);
    para.value = name + " " + surname;
    para.setAttribute('readonly', true);
    document.getElementById('btn-send').setAttribute('data-id', this.getAttribute('data-id'));

}

function closeNewMessage() {
    document.getElementById('newMessage').classList.add('noVisible');
}

async function sendContentMsg() {

    const messageTxt = document.querySelector('textarea[name="message"]').value;
    const id_addressee = parseInt(this.getAttribute('data-id'));
    // creacion de la conversacion
    const conversationData = {
        id_user1: id_addressee,
        id_user2: user.id
    }

    // obtenemos id conversacion
    const conversation = await postServer('/api/createConversation/', conversationData);
    const id_conversation = conversation.id_conversation;

    // creamos el mensaje
    const message = {
        id_addressee,
        messageTxt,
        id_conversation,
        user
    };

    // desaparece ventana y se inicializan campos
    document.getElementById('newMessage').classList.add('noVisible');
    document.querySelector('input[name="addressee"]').value = '';
    document.querySelector('textarea[name="message"]').value = '';

    // creacion del mensaje
    await postServer('/api/sendMessage', message);

}

async function findYourFriends() {

    const letters = this.value;

    if (letters.length > 0) {

        let selection = findFriendByLetters(letters);
        loadFriends(selection);

    }else{

        loadFriends(friends);
    }
}

function findFriendByLetters(letters) {

    let selection = [];
    letters = letters.toUpperCase();

    for (friend of friends) {

        if (friend.nombre.startsWith(letters)) selection.push(friend);

    }

    return selection;
}

async function init() {

    //obtenemos el id usuario 
    let localStorageInfo = JSON.parse(localStorage.getItem('user'));

    //con el id obtenemos el usario
    user = await getServer('/user/findById/' + localStorageInfo.id);

    // obtenemos los amigos del usuario
    const relationships = await getServer('/user/getFriends/' + user.id);
    friends = await getFriends(relationships);
    loadFriends(friends);

    // listener buscar amigo
    document.getElementById('finder').addEventListener('keyup', findYourFriends);

    // listener mensaje nuevo e inicializar campos
    document.querySelector('textarea[name="message"]').value = '';
    document.getElementById('close-newMsg').addEventListener('click', closeNewMessage);
    document.getElementById('btn-send').addEventListener('click', sendContentMsg);

}

/* Variables Globales */
let user;
let friends;

window.addEventListener('load', init);