/* MÉTODOS CONEXION SERVIDOR */
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

async function deleteNotification() {

    //borrado en interfaz
    let localContent = document.getElementById(this.getAttribute('data-id'));

    localContent.classList.add('noVisible');
    localContent.innerHTML = '';

    // borra notificacion de la BBDD
    await deleteServer('/api/deleteNotification/' + this.getAttribute('data-id'));


}

async function loadNotifications() {

    // averiguo las notificaciones que tiene
    const notifications = await getServer('/api/getNotifications/' + user.id);

    //cargo vista con las notificaciones del usuario
    // div principal
    const inbox = document.getElementById('inbox');

    notifications.forEach(notification => {

        console.log(notification);

        const msgTemplate = document.createElement('div');
        msgTemplate.classList.add('msgTemplate')
        msgTemplate.setAttribute('id', notification.id);
        inbox.appendChild(msgTemplate);

        const dataContent = document.createElement('div');
        dataContent.classList.add('dataContent');
        msgTemplate.appendChild(dataContent);

        const headerMsg = document.createElement('div');
        headerMsg.classList.add('headerNtf');
        dataContent.appendChild(headerMsg);

        const dateMsg = document.createElement('span');
        dateMsg.classList.add('dateMsg');
        dateMsg.innerHTML = notification.fecha_envio;
        headerMsg.appendChild(dateMsg);

        const msgOptions = document.createElement('div');
        msgOptions.classList.add('msgOptions');
        headerMsg.appendChild(msgOptions);

        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        btnDelete.addEventListener('click', deleteNotification);
        btnDelete.setAttribute('data-id', notification.id);
        msgOptions.appendChild(btnDelete);

        const msgData = document.createElement('div');
        msgData.classList.add('msgData');
        dataContent.appendChild(msgData);

        const ntfText = document.createElement('div');
        ntfText.classList.add('msg');
        msgData.appendChild(ntfText);

        const msgText = document.createElement('span');
        msgText.classList.add('msgText');
        msgText.innerHTML = notification.contenido;
        ntfText.appendChild(msgText);

    });



}



async function init() {

    // Obtenemos el id del usuario
    userId = JSON.parse(localStorage.getItem('user'));
    user = await getServer('/user/findById/' + userId.id);

    loadNotifications();

}


/* Variables globales */
let user;

window.addEventListener('load', init);