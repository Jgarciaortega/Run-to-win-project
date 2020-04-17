async function getServer(url) {
    const res = await fetch(url);
    const data = await res.json();

    return data;

}

async function countMsg(){

    const url = '/api/countMessages/'+userId.id;
    
    const count = await getServer(url);
    document.getElementById('msgQuantity').innerHTML = count.total;
    
}

async function countNtf(){

}


function deployMenu() {
    document.getElementById('menuUser').classList.remove('noVisible');
}

function hideMenu() {
    document.getElementById('menuUser').classList.add('noVisible');
}

async function init() {

    // Obtenemos el id del usuario
    userId = JSON.parse(localStorage.getItem('user')); 

    //1º peticion a strava de los datos del usuario
    document.getElementById('btn-strava').addEventListener('click', connectToStrava);

    //listeners para desplegar/plegar menus
    document.getElementById('user').addEventListener('click', deployMenu);
    document.getElementById('menuUser').addEventListener('mouseleave', hideMenu);

    //contamos mensajes / notificaciones pendientes
    await countMsg();
    await countNtf();

    
}

//Variables Globales
let dataStrava;
let userId;

window.addEventListener('load', init);


























function getActivities(res) {

    console.log(res.access_token);
    const activities_link = `https//www.strava.com/api/v3/athlete/activities?acces_token=${res.access_token}`;

    fetch(activities_link)
        .then((res) => console.log(res.json()));

}

function connectToStrava() {

    /* How to make a cURL request */
    // const link = 'https://www.strava.com/api/v3/athlete';
    // fetch(link, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': 'Bearer 358cd715b77528f83ddda22289d77d7c8131209f'
    //     }
    // }).then(res => res.json())
    // .then(res => console.log(res));

    /* How to Authenticate */

    // const linkWeb = 'https://www.strava.com/oauth/authorize';
    const linkWeb = 'https://www.strava.com/oauth/authorize?client_id=45209&redirect_uri=http://localhost/exchange_token&response_type=code&approval_prompt=auto&scope=activity:read';

    fetch(linkWeb, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }

    }).then(res => res.json())
        .then(res => console.log(res));


    // const auth_link = "https://www.strava.com/oauth/token";

    // //get autorithazion
    // fetch(auth_link, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         client_id: '45209',
    //         client_secret: 'b243104c7d93e8206bece4dd75e4c6cb948a3c2c',
    //         refresh_token: '6fc147b86f129b3a63b67fc8c17bd9d0dbfecb5e',
    //         grant_type: 'refresh_token'
    //     })

    // }).then(res => res.json())
    //     .then(res => getActivities(res));


    // const link = 'http://www.strava.com/api/v3/athlete/activities';

    // fetch(link, {
    //     method: 'GET',
    //     headers: {
    //         'access_token': '1ce06872b33defaebfe2b42252e8b6b64770ab89'
    //     }
    // }).then(res => res.json())
    // .then(res => console.log(res));

}


/*

https://www.youtube.com/watch?v=W_-Ai33_8f8
https://www.youtube.com/watch?v=sgscChKfGyg&list=PLO6KswO64zVvcRyk0G0MAzh5oKMLb6rTW&index=2&t=0s

1) Get authoriztion code from authorizacion page. This is a one time, manual step.
Paste the below code in a browser, hit enter then grab the "code" part from the resulting url.

http://www.strava.com/oauth/authorize?client_id=45209&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read_all

2) Exchange authorization code for access token & refresh token (POST)

https://www.strava.com/oauth/token?client_id=45209&client_secret=b243104c7d93e8206bece4dd75e4c6cb948a3c2c&code=68c773f4eb061415c7e6bb24a070f02be3cf81ed&grant_type=authorization_code

3) View your activities using the access token just received

http://www.strava.com/api/v3/athlete?access_token=2be427de19e7b2848d7af662aaf65808ba0c75c0

3) Use refresh token to get new access tokens

http://www.strava.com/oauth/token?client_id=45209&client_secret=b243104c7d93e8206bece4dd75e4c6cb948a3c2c&refresh_token=

*/

