
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
    const id_msg = this.getAttribute('data-id');
    const mainContent = document.getElementById(id_msg);
    const txt_msg = mainContent.lastChild.firstChild;
   
   
    // solo permito que se haga reply a un msg si su lenght > 0
    if (txt_msg.value.length > 0) {
        // para generar nuevo mensaje obtengo todo el contenido previo
        const msgComplete = generateMsg(mainContent, txt_msg.value);
        mainContent.classList.add('noVisible');
        await updateMessage(id_msg, id_addressee, userId.id, msgComplete);
    
    }


}

async function updateMessage(id_msg, addressee, sender, msgComplete) {

    const url = '/api/updateMessage/' + id_msg;

    const message = {
        txt: msgComplete,
        addressee,
        sender
    };

    await putServer(url, message);

}

function generateMsg(mainContent, txt_msg, date) {

    const content = mainContent.firstChild;
    const dataContent = content.firstChild.children;
    let msgComplete = '';

    for (let i = 0; i < dataContent.length; i++) {

        msgComplete += dataContent[i].children[1].innerHTML;

        msgComplete += ' * ';

    }
    msgComplete += txt_msg;
    return msgComplete;
}

async function sendMessage(id_addressee, messageTxt) {

    console.log(id_addressee, messageTxt);

    // console.log(document.querySelector('input[name="addressee"]'));
    // const message = {
    //     id_addressee,
    //     messageTxt,
    //     user
    // };

    // await postServer('/api/sendMessage', message);
}

function divideMsg(msg) {

    const messages = msg.split('*');
    return messages;

}

function showMessages(messages) {

    const inbox = document.getElementById('inbox');

    messages.forEach(async msg => {

        // 1 primero averiguamos el usuario que crea el mensaje
        const userSentMsg = await getServer('/user/findById/' + msg.id_usuario);
        console.log(userSentMsg);

        // 2 div principal del mensaje (msg y reply msg)
        const msgTemplate = document.createElement('div');
        msgTemplate.classList.add('msgTemplate')
        msgTemplate.setAttribute('id', msg.id);
        inbox.appendChild(msgTemplate);


        // 2.1 div msg
        const dataContent = document.createElement('div');
        dataContent.classList.add('dataContent');
        msgTemplate.appendChild(dataContent);

        // 2.1.1 div datos msg
        const msgData = document.createElement('div');
        msgData.classList.add('msgData');
        dataContent.appendChild(msgData);

        /* Bucle de aquí */
        let msgParts = divideMsg(msg.contenido);
        // 2.1.1.1 div msg
        let imgMsg;
        for (let i = 0; i < msgParts.length; i++) {

            if (i % 2 == 0) imgMsg = userSentMsg.imagen;
            else imgMsg = user.imagen;

            const message = document.createElement('div');
            message.classList.add('msg');
            msgData.appendChild(message);

            // 2.1.1.1.1 img user envia mensaje

            const avatar = document.createElement('img');
            avatar.setAttribute('src', imgMsg);
            avatar.setAttribute('alt', 'imagen usuario envia mensaje');
            message.appendChild(avatar);

            // 2.1.1.1.2 info del msg
            const msgText = document.createElement('span');
            msgText.classList.add('msgText');
            msgText.innerHTML = msgParts[i];
            message.appendChild(msgText);

        }
        /* Hasta aquí bucle */

        // 2.1.2 botonera opciones enviar
        const msgOptions = document.createElement('div');
        msgOptions.classList.add('msgOptions');
        dataContent.appendChild(msgOptions);

        // 2.1.2.1 boton contestar
        const btnReply = document.createElement('button');
        btnReply.innerHTML = '<i class="fas fa-reply"></i>';
        btnReply.addEventListener('click', showReplyMessage);
        btnReply.setAttribute('data-id', msg.id);
        msgOptions.appendChild(btnReply);

        // 2.1.2.2 boton borrar mensaje
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        btnDelete.addEventListener('click', deleteMessage);
        btnDelete.setAttribute('data-id', msg.id);
        msgOptions.appendChild(btnDelete);

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
        btnSend.setAttribute('data-id', msg.id);
        btnSend.setAttribute('data-addresse', userSentMsg.id);
        replyOptions.appendChild(btnSend);

        // 2.2.2.2. boton cerrar
        const btnClose = document.createElement('button');
        btnClose.innerHTML = '<i class="fas fa-window-close"></i>';
        btnClose.addEventListener('click', closeReplyMessage);
        btnClose.setAttribute('data-id', msg.id);
        replyOptions.appendChild(btnClose);

    });
}

function deleteMessage() {

    // // 1º borrar en BBDD
    deleteServer('/api/deleteMsg/' + this.getAttribute('data-id'));

    // 2º borrar en interfaz (vamos subiendo del boton a nodo padre para eliminarlo)
    let localContent = this.parentNode;
    let intermediateContent = localContent.parentNode;
    let mainContent = intermediateContent.parentNode;

    mainContent.classList.add('noVisible');
    mainContent.innerHTML = '';

}

/* MÉTODOS CONEXION SERVIDOR */

async function putServer(url, data) {

    let body = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res1 = await fetch(url, body);
    // const res2 = await res.json();

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

    // Descargamos los mensajes del usuario y se muestran
    const messages = await getServer('/api/getMessages/' + userId.id)
    showMessages(messages);

    // Listeners ventana mensaje nuevo
    document.getElementById('btn-send').addEventListener('click', function () {
        sendMessage(
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