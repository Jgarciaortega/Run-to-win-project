// function createChart(data) {

//     var ctx = document.getElementById('canvas').getContext('2d');
//     var myChart = new Chart(ctx, data);

// }


//Obtiene el parametro id usuario de la url (enviado por get desde /authentication)
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

async function loadInfoUser(id) {

    const url = '/user/findById';
    const userId = { id };
    const user = await sendToServer(url, userId);
    const nickname = document.getElementById('nickname');
    const level = document.getElementById('level');
    const achievements = document.getElementById('achievements-quantity');

    
    nickname.innerHTML = user.nickname;
    level.innerHTML = user.status;
    achievements.innerHTML = user.logros;

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



function informeSemanal() {

    fetch('/api/prueba/' + 'Javi')
        .then(response => response.json())
        .then(data => createChart(data));

}

function init() {

     //1º obtenemos el id usuario de la url para carga su informacion
     loadInfoUser(getParameterByName('id'));
     
    document.getElementById('informeSemanal').addEventListener('click', informeSemanal);

}


window.addEventListener('load', init);