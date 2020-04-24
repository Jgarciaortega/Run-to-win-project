/* FUNCIONES GENERALES */

function showLoadCircle(mainContainer){

    const loadContainer = document.createElement('div');
    loadContainer.setAttribute('id','loadContainer');
    mainContainer.appendChild(loadContainer);

    const loadCircle = document.createElement('div');
    loadCircle.setAttribute('id','load');
    loadContainer.appendChild(loadCircle);

    setTimeout(() => { mainContainer.removeChild(loadContainer) }, 2000)

}

function limpiarNodo(elemento) {

    if (elemento.hasChildNodes()) {

        while (elemento.childNodes.length >= 1) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

function createDoughnut(element,data){

    const ctx = element.getContext('2d');

    const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data

    });
}

function chart() {
    const ctx = document.getElementById('statusChart').getContext('2d');

    data = {
        datasets: [{
            data: [100, 1000],
            backgroundColor: ['rgba(36,242, 33, 1)',
                'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(36,242, 33, 1)',
                'rgba(255, 99, 132, 0.2)'],
            hoverBorderColor: ['rgba(2, 190, 2, 1)',
                'rgba(242,33,33,1)']

        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Tus puntos',
            'Objetivo'
        ]
    };

    const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data

    });
}

function generateDataIMC(){

const IMC = user.peso / user.altura;
console.log('peso: ' + user.peso);
console.log('altura: ' + user.altura);

console.log(IMC);




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

/* FUNCIONES RELACIONADAS CON DATOS DEL USUARIO*/

function showInfoUser(user) {

    const nickname = document.getElementById('nickname');
    const level = document.getElementById('level');
    const achievements = document.getElementById('achievements-quantity');
    const photo = document.getElementById('photo')

    const imgPhoto = document.createElement('img');
    imgPhoto.setAttribute('src', user.imagen);
    imgPhoto.setAttribute('alt', 'Imagen del usuario');
    photo.appendChild(imgPhoto);

    nickname.innerHTML = user.nickname;
    level.innerHTML = user.status;
    achievements.innerHTML = user.logros;

    chart();
}


async function loadInfoUser(localStorage) {

    const url = '/user/findById/' + localStorage.id;
    const user = await getFromServer(url);

    return user;

}

async function loadRutine(id_rutina) {

    const url = '/api/rutine/' + id_rutina;
    const actividades = await getFromServer(url);

    return actividades;

}

/* FUNCIONES MENU LATERAL */

function muestraInicio() {

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'inicio');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloUpDown');
    textPortada.innerHTML = 'INICIO';
    inicioContainer.appendChild(textPortada);

}

function muestraInforme() {

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'informes');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloUpDown');
    textPortada.innerHTML = 'INFORMES';
    inicioContainer.appendChild(textPortada);

}

function muestraSalud() {

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'health');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloDownUp');
    textPortada.innerHTML = 'SALUD';
    inicioContainer.appendChild(textPortada);

    //showLoadCircle(mainContainer);

    // contenido salud
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('subMenu');
    dataContainer.setAttribute('id','salud');
    mainContainer.appendChild(dataContainer);

    const dataIMC = document.createElement('div');
    // dataIMC.setAttribute('id', 'IMC');
    dataIMC.classList.add('graficoSalud');
    dataContainer.appendChild(dataIMC);
    const canvasIMC = document.createElement('canvas');
    canvasIMC.setAttribute('id','IMC');
    dataIMC.appendChild(canvasIMC);
    let dataDoughnutIMC = generateDataIMC();
    createDoughnut(canvasIMC,dataDoughnutIMC);

    // const dataTensionAlta = document.createElement('div');
    // dataTensionAlta.setAttribute('id','tensionAlta');
    // dataTensionAlta.classList.add('graficoSalud');
    // dataContainer.appendChild(dataTensionAlta);
    // const canvasTensionAlta = document.createElement('canvas');
    // dataTensionAlta.appendChild(canvasTensionAlta);
    // let dataDoughnut = generateDataDoughnut();
    // createDoughnut(canvasTensionAlta,dataDoughnut);

    // const dataTensionBaja = document.createElement('div');
    // dataTensionBaja.setAttribute('id','tensionBaja');
    // dataTensionBaja.classList.add('graficoSalud');
    // dataContainer.appendChild(dataTensionBaja);

    // const dataPulsaciones = document.createElement('div');
    // dataPulsaciones.setAttribute('id','pulsaciones');
    // dataPulsaciones.classList.add('graficoSalud');
    // dataContainer.appendChild(dataPulsaciones);
}

async function muestraRutina() {

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'rutina');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloDownUp');
    textPortada.innerHTML = 'RUTINAS';
    inicioContainer.appendChild(textPortada);

    // descargamos la rutina del usuario(dato estatico para realizar pruebas)
    const rutina = await loadRutine(1);
    
    showLoadCircle(mainContainer);
    
    setTimeout(() => {

    //montamos la tabla-rutina
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('subMenu');
    mainContainer.appendChild(dataContainer);

    const headerRoutine = document.createElement('div');
    headerRoutine.classList.add('headerSubMenus');
    dataContainer.appendChild(headerRoutine);

    const titleRoutine = document.createElement('h3');
    titleRoutine.innerHTML = rutina.nombre;
    headerRoutine.appendChild(titleRoutine);

    const tabla = document.createElement('table');
    dataContainer.appendChild(tabla);
    const col = 4;
    const filas = 7;
    const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const ejercicios = [rutina.dia1, rutina.dia2, rutina.dia3, rutina.dia4, rutina.dia5, rutina.dia6, rutina.dia7];

    for (let i = 0; i <= filas; i++) {

        const row = document.createElement('tr');
        tabla.appendChild(row);

        for (let y = 0; y < col; y++) {

            const title = document.createElement('th');
            const cell = document.createElement('td');

            if (i == 0) {

                (y == 0) ? title.innerHTML = '' : title.innerHTML = 'SEMANA ' + (y);
                row.appendChild(title);

            } else {

                (y == 0) ? cell.innerHTML = diasSemana[i - 1] : cell.innerHTML = ejercicios[i-1];
                row.appendChild(cell);
            }


        }

    }
    }, 2000);
  
}

async function init() {

    //1º obtenemos el id usuario 
    let localStorageInfo = JSON.parse(localStorage.getItem('user'));
    //2º con el id obtenemos el usario
    user = await loadInfoUser(localStorageInfo);
    //3º mostramos la info basica del perfil
    showInfoUser(user);

    // listeners menu lateral
    document.getElementById('inicio').addEventListener('click', muestraInicio);
    document.getElementById('informe').addEventListener('click', muestraInforme);
    document.getElementById('salud').addEventListener('click', muestraSalud);
    document.getElementById('rutinaEjercicios').addEventListener('click', muestraRutina);

    // para pruebas


    /* NOTA: para borrar localstorage es : localStorage.remove('user'); */

}


/* VARIABLES GLOBALES*/
// objeto user = obtiene en init todos los datos que se mostraran en su perfil
let user;


window.addEventListener('load', init);