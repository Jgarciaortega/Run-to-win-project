
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

    let y = parseInt((window.screen.height/2)-(altura/2));
    let x = parseInt((window.screen.width/2)-(anchura/2));

    //2º 

}

function sendMessage(){

    let addressee = document.querySelector('input[name="addressee"]').value;
    let message = document.querySelector('textarea[name="message"]').value;

    console.log(addressee + " " + message);
    
}


function init() {

    document.getElementById('btn-send').addEventListener('click',showWindowSend);

    // Listener ventana mensaje nuevo
    document.getElementById('btn-send').addEventListener('click', sendMessage);

    // Drag and drop listeners
    let newMessage = document.getElementById('newMessage');
    let placeDroppable = document.querySelector('body');
    newMessage.addEventListener('dragstart', drag); 
    placeDroppable.addEventListener('dragover', allowDrop);
    placeDroppable.addEventListener('drop',drop);

    
}



window.addEventListener('load', init);