
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

function closeReplyMessage(){
 
    const botonera = this.parentNode;
    const divReplyMsg = botonera.parentNode;
    
    divReplyMsg.classList.add('noVisible');
    
}

async function replyMessage() {

    console.log(this.getAttribute('data'));
    document.getElementById(this.getAttribute('data')).classList.remove('noVisible');
    document.getElementById(this.getAttribute('data')).classList.add('showReplyMsg');
    
}

async function sendMessage(addressee, messageTxt) {

    console.log(document.querySelector('input[name="addressee"]'));
    
    const message = {
        addressee,
        messageTxt,
        user
    };

    await postServer('/api/sendMessage', message);
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

function showMessages(messages) {

    const inbox = document.getElementById('inbox');

    messages.forEach(async msg => {

        // primero averiguamos el usuario que crea el mensaje
        const userSentMsg = await getServer('/user/findById/' + msg.id_usuario);

        // div principal del mensaje
        const message = document.createElement('div');
        message.classList.add('msgTemplate')
        inbox.appendChild(message);

        // div foto del usuario envia mensaje
        const photo = document.createElement('div');
        photo.classList.add('msgPhoto');
        message.appendChild(photo);

        // img del usuario
        const avatar = document.createElement('img');
        avatar.setAttribute('src', userSentMsg.imagen);
        avatar.setAttribute('alt', 'imagen usuario envia mensaje');
        photo.appendChild(avatar);

        // div del texto mensaje
        const text = document.createElement('div');
        text.classList.add('msgText');
        message.appendChild(text);

        // contenido mensaje (creador msg + contenido msg)
        const nombre = document.createElement('h4');
        nombre.innerHTML = userSentMsg.nickname;
        text.appendChild(nombre);
        const contenido = document.createElement('p');
        contenido.innerHTML = msg.contenido;
        text.appendChild(contenido);

        // div fecha envio mensaje y botones
        const date = document.createElement('div');
        date.classList.add('msgDate');
        message.appendChild(date);

        // fecha
        const datoFecha = document.createElement('p');
        datoFecha.innerHTML = msg.fecha_envio;
        date.appendChild(datoFecha);

        // div botonera borrar
        const buttons = document.createElement('div');
        buttons.classList.add('btn-msg');
        date.appendChild(buttons);

        // boton borrar
        const btnReply = document.createElement('button');
        btnReply.classList.add('reply');
        btnReply.setAttribute('data', msg.id);
        btnReply.addEventListener('click', replyMessage);
        btnReply.innerHTML = '<i class="fas fa-reply"></i>';
        buttons.appendChild(btnReply);
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('delete');
        btnDelete.setAttribute('data', msg.id);
        btnDelete.addEventListener('click', deleteMessage);
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        buttons.appendChild(btnDelete);

        // div respuesta 
        const contentReply = document.createElement('div');
        contentReply.classList.add('msgReply','noVisible');
        contentReply.setAttribute('id',msg.id);
        inbox.appendChild(contentReply);

        // contenido div respuesta
        const divTxtAreaReply = document.createElement('div');
        divTxtAreaReply.classList.add('txtArea');
        contentReply.appendChild(divTxtAreaReply);
        const txtAreaReply = document.createElement('textarea');
        // txtAreaReply.setAttribute('name','message');
        // txtAreaReply.setAttribute('id', msg.id);
        txtAreaReply.setAttribute('cols','94');
        // txtAreaReply.setAttribute('rows','1');
        divTxtAreaReply.appendChild(txtAreaReply);

        const botoneraSendReply = document.createElement('div');
        botoneraSendReply.classList.add('botoneraSendReply');
        contentReply.appendChild(botoneraSendReply);
        const btnSendReply = document.createElement('button');
        btnSendReply.innerHTML = '<i class="fas fa-paper-plane"></i>';
        botoneraSendReply.appendChild(btnSendReply);
        const btnCloseReply = document.createElement('button');
        btnCloseReply.innerHTML = '<i class="fas fa-window-close"></i>';
        btnCloseReply.addEventListener('click', closeReplyMessage);
        botoneraSendReply.appendChild(btnCloseReply);
        

    });
}

function deleteMessage() {

    // 1º borrar en BBDD
    deleteServer('/api/deleteMsg/' + this.getAttribute('data'));

    // 2º borrar en interfaz (vamos subiendo del boton a nodo padre para eliminarlo)
    let localContent = this.parentNode;
    let intermediateContent = localContent.parentNode;
    let mainContent = intermediateContent.parentNode;

    mainContent.classList.add('noVisible');
    mainContent.innerHTML = '';

}


async function init() {

    // Obtenemos el id del usuario
    userId = JSON.parse(localStorage.getItem('user'));
    user = await getServer('/user/findById/' + userId.id);

    // Descargamos los mensajes del usuario y se muestran
    messages = await getServer('/api/getMessages/' + userId.id)
    showMessages(messages);

    // Listeners ventana mensaje nuevo
    document.getElementById('btn-send').addEventListener('click', function () {
        sendMessage(document.querySelector('input[name="addressee"]').value,
            document.querySelector('textarea[name="message"]').value)
    });
    document.getElementById('close-newMsg').addEventListener('click', closeNewMessage);
    document.getElementById('btn-msg').addEventListener('click', showWindowSend);

    // Drag and drop listeners
    let newMessage = document.getElementById('newMessage');
    let placeDroppable = document.querySelector('body');
    newMessage.addEventListener('dragstart', drag);
    placeDroppable.addEventListener('dragover', allowDrop);
    placeDroppable.addEventListener('drop', drop);

}

/* Variables globales */
let user;
let messages;

window.addEventListener('load', init);
window.addEventListener('scroll', fijarHeader);