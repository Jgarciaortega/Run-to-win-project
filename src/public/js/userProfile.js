// function createChart(data) {

//     var ctx = document.getElementById('canvas').getContext('2d');
//     var myChart = new Chart(ctx, data);

// }


async function loadInfoUser(userId) {

    const url = '/user/findById/'+userId.id;
    const user = await getFromServer(url);
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

async function getFromServer(url) {

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

function informeSemanal() {

    // fetch('/api/prueba/' + 'Javi')
    //     .then(response => response.json())
    //     .then(data => createChart(data));

}

function init() {

    //1º obtenemos el id usuario de la url para carga su informacion
    // para borrar localstorage es : localStorage.remove('user');
    const userId = JSON.parse(localStorage.getItem('user'));
    loadInfoUser(userId);

    document.getElementById('informeSemanal').addEventListener('click', informeSemanal);

}

window.addEventListener('load', init);