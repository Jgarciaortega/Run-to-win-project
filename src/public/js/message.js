
function fijarHeader() {
    // Get the header
    var header = document.querySelector('header');

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
/* INICIO DRAG AND DROP */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    ev.preventDefault();

    let data = ev.dataTransfer.getData("text");
    let element = document.getElementById(data);

    let x = window.event.clientX;
    let y = window.event.clientY;

    element.style.top = y + 'px';
    element.style.left = x + 'px';
}

/* FIN DRAG AND DROP */

function showWindowSend() {

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
}

function closeNewMessage() {
    document.getElementById('newMessage').classList.add('noVisible');
}

function closeReplyMessage() {

    const botonera = this.parentNode;
    const divReplyMsg = botonera.parentNode;

    divReplyMsg.classList.add('noVisibility');
    divReplyMsg.classList.remove('showReplyMsg');
}

function showReplyMessage() {

    const mainContent = document.getElementById(this.getAttribute('data-id'));
    const content = mainContent.lastChild;
    content.classList.remove('noVisibility');
    content.classList.add('showReplyMsg');

}
async function sendMessageReply() {

    const id_addressee = this.getAttribute('data-addresse');
    const id_conversation = this.getAttribute('data-id');
    const mainContent = document.getElementById(id_conversation);
    const messageTxt = mainContent.lastChild.firstChild.value;

    // solo permito que se haga reply a un msg si su lenght > 0
    if (messageTxt.length > 0) {

        const message = {
            id_addressee,
            messageTxt,
            id_conversation,
            user
        };
        await postServer('/api/sendMessage', message);
    }
}


async function createNewMessage(addressee, messageTxt) {

    // 1º obtenemos user que va a recibir el mensaje
    const userAddresse = await getServer('/user/findByNickname/' + addressee);

    // 2º creamos el objeto que generara la conversacion y la creamos
    const conversationData = {
        id_user1: userAddresse.id,
        id_user2: user.id
    }

    //3º cuando la creamos nos devuelve su id 
    const conversation = await postServer('/api/createConversation/', conversationData);
    const id_conversation = conversation.id_conversation;

    //4º creamos objeto mensaje al cual incluimos el id de la conversacion generada
    const message = {
        id_addressee: userAddresse.id,
        messageTxt,
        id_conversation,
        user
    };

    //5º desaparece ventana y se inicializan campos
    document.getElementById('newMessage').classList.add('noVisible');
    document.querySelector('input[name="addressee"]').value = '';
    document.querySelector('textarea[name="message"]').value = '';

    //6º creacion del mensaje
    await postServer('/api/sendMessage', message);

}


function getAddresse(conversation) {
    // averiguo a que usuario responder por descarte
    const userId1 = conversation[0].id_destinatario;
    const userId2 = conversation[0].id_usuario;
    let id;

    (userId1 == user.id) ? id = userId2 : id = userId1;

    return id;

}

async function showMessages(conversation) {

    // del primer mensaje obtenemos la info que contendra esta conversacion
    const senderId = conversation[0].id_usuario;
    const conversId = conversation[0].id_conversacion;

    // div principal
    const inbox = document.getElementById('inbox');

    // 1 primero obtenemos al usuario que crea el mensaje
    const sender = await getServer('/user/findById/' + senderId);

    // 2 div principal del mensaje (msg y reply msg)
    const msgTemplate = document.createElement('div');
    msgTemplate.classList.add('msgTemplate')
    msgTemplate.setAttribute('id', conversId);
    inbox.appendChild(msgTemplate);

    // 2.1 div msg
    const dataContent = document.createElement('div');
    dataContent.classList.add('dataContent');
    msgTemplate.appendChild(dataContent);

    // 2.1.1 header msg
    const headerMsg = document.createElement('div');
    headerMsg.classList.add('headerMsg');
    dataContent.appendChild(headerMsg);

    // // 2.1.1.1
    const senderMsg = document.createElement('span');
    senderMsg.classList.add('senderMsg');
    senderMsg.innerHTML = sender.nickname;
    headerMsg.appendChild(senderMsg);

    // 2.1.1.2
    const dateMsg = document.createElement('span');
    const lastSend = conversation[conversation.length - 1].fecha_envio;
    dateMsg.classList.add('dateMsg');
    dateMsg.innerHTML = 'Last updated: ' + lastSend;
    headerMsg.appendChild(dateMsg);

    // 2.1.1.3 botonera opciones enviar
    const msgOptions = document.createElement('div');
    msgOptions.classList.add('msgOptions');
    headerMsg.appendChild(msgOptions);

    // 2.1.1.4 boton contestar
    const btnReply = document.createElement('button');
    btnReply.innerHTML = '<i class="fas fa-reply"></i>';
    btnReply.addEventListener('click', showReplyMessage);
    btnReply.setAttribute('data-id', conversId);
    msgOptions.appendChild(btnReply);

    // 2.1.1.5 boton borrar mensaje
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    btnDelete.addEventListener('click', deleteConversation);
    btnDelete.setAttribute('data-id', conversId);
    msgOptions.appendChild(btnDelete);

    // 2.1.2 div datos msg
    const msgData = document.createElement('div');
    msgData.classList.add('msgData');
    dataContent.appendChild(msgData);

    // mostramos cada mensaje que tiene la conversacion
    conversation.forEach(async msg => {

        const creatorMsg = await getServer('/user/findById/' + msg.id_usuario);

        const message = document.createElement('div');
        message.classList.add('msg');
        msgData.appendChild(message);

        const avatar = document.createElement('img');
        avatar.setAttribute('src', creatorMsg.imagen);
        avatar.setAttribute('alt', 'imagen usuario envia mensaje');
        message.appendChild(avatar);

        const msgText = document.createElement('span');
        msgText.classList.add('msgText');
        msgText.innerHTML = msg.contenido;
        message.appendChild(msgText);

    })

    // 2.2 div msgReply
    const msgReply = document.createElement('div');
    msgReply.classList.add('msgReply');
    msgReply.classList.add('noVisibility');
    msgTemplate.appendChild(msgReply);

    // 2.2.1 area texto respuesta
    const reply = document.createElement('textarea');
    reply.setAttribute('cols', '90');
    msgReply.appendChild(reply);

    // 2.2.2 botonera opciones reply
    const replyOptions = document.createElement('div');
    replyOptions.classList.add('replyOptions');
    msgReply.appendChild(replyOptions);

    // 2.2.2.1 boton enviar
    const btnSend = document.createElement('button');
    btnSend.innerHTML = '<i class="fas fa-paper-plane"></i>';
    btnSend.addEventListener('click', sendMessageReply);
    btnSend.setAttribute('data-id', conversId);
    btnSend.setAttribute('data-addresse', getAddresse(conversation));
    replyOptions.appendChild(btnSend);

    // 2.2.2.2. boton cerrar
    const btnClose = document.createElement('button');
    btnClose.innerHTML = '<i class="fas fa-window-close"></i>';
    btnClose.addEventListener('click', closeReplyMessage);
    btnClose.setAttribute('data-id', conversId);
    replyOptions.appendChild(btnClose);

}
// borra al usuario de esta conversacion
function deleteConversation() {

    // 1º elimina al usuario de la conversacion
    putServer('/api/updateConversation/' + this.getAttribute('data-id') + "/" + user.id);

    // 2º delete conversation si los dos usuarios se han borrado de ella
    deleteServer('/api/deleteConversation/' + this.getAttribute('data-id'));

    // 3º borrar en interfaz (vamos subiendo del boton a nodo padre para eliminarlo)
    let localContent = document.getElementById(this.getAttribute('data-id'));

    localContent.classList.add('noVisible');
    localContent.innerHTML = '';

}

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

    console.log(data);

}


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

async function deleteServer(url) {

    let body = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(url, body);
    const data = await res.json();

    console.log(data);

}

async function getServer(url) {

    const res = await fetch(url);
    const data = await res.json();

    return data;

}
/* FIN METODOS CONEXION SERVIDOR */

async function init() {

    // Obtenemos el id del usuario
    userId = JSON.parse(localStorage.getItem('user'));
    user = await getServer('/user/findById/' + userId.id);

    // averiguo las conversaciones que tiene abiertas este usuario
    const conversations = await getServer('/api/getConversation/' + userId.id);

    // cargo la vista con los mensajes de cada conversacion
    conversations.forEach(async conversation => {
        let conversacion = await getServer('/api/getMessages/' + conversation.id);
        showMessages(conversacion);
    })

    // Listeners ventana mensaje nuevo
    document.getElementById('btn-send').addEventListener('click', function () {
        createNewMessage(
            document.querySelector('input[name="addressee"]').value,
            document.querySelector('textarea[name="message"]').value)
    });
    document.getElementById('close-newMsg').addEventListener('click', closeNewMessage);
    document.getElementById('btn-newMsg').addEventListener('click', showWindowSend);

    // Drag and drop listeners
    let newMessage = document.getElementById('newMessage');
    let placeDroppable = document.querySelector('body');
    newMessage.addEventListener('dragstart', drag);
    placeDroppable.addEventListener('dragover', allowDrop);
    placeDroppable.addEventListener('drop', drop);

}

/* Variables globales */
let user;


window.addEventListener('load', init);
window.addEventListener('scroll', fijarHeader);