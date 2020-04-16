
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
    const altura = 380;
    const anchura = 630;

    let y = parseInt((window.screen.height / 2) - (altura / 2));
    let x = parseInt((window.screen.width / 2) - (anchura / 2));

    //2º Remove class noVisible
    document.getElementById('newMessage').classList.remove('noVisible');
}

function closeNewMessage() {
    document.getElementById('newMessage').classList.add('noVisible');
}

async function sendMessage() {

    const addressee = document.querySelector('input[name="addressee"]').value;
    const messageTxt = document.querySelector('textarea[name="message"]').value;
    const message = {
        addressee,
        messageTxt,
        user
    };

    await sendToServer('/api/sendMessage', message);

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


function init() {

    document.getElementById('btn-msg').addEventListener('click', showWindowSend);

    // Listener ventana mensaje nuevo
    document.getElementById('btn-send').addEventListener('click', sendMessage);
    document.getElementById('close-newMsg').addEventListener('click', closeNewMessage);

    // Drag and drop listeners
    let newMessage = document.getElementById('newMessage');
    let placeDroppable = document.querySelector('body');
    newMessage.addEventListener('dragstart', drag);
    placeDroppable.addEventListener('dragover', allowDrop);
    placeDroppable.addEventListener('drop', drop);

    user = JSON.parse(localStorage.getItem('user'));
    console.log(user);


}

/* Variables globales */ 
let user;

window.addEventListener('load', init);