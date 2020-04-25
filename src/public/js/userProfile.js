/* FUNCIONES GENERALES */

function showLoadCircle(mainContainer) {

    const loadContainer = document.createElement('div');
    loadContainer.setAttribute('id', 'loadContainer');
    mainContainer.appendChild(loadContainer);

    const loadCircle = document.createElement('div');
    loadCircle.setAttribute('id', 'load');
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

function createDoughnut(element, data) {

    const ctx = element.getContext('2d');

    const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data

    });
}

function chart() {
    const ctx = document.getElementById('statusChart').getContext('2d');

    data = {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            data: [20, 10, 4, 2]
        }]
    }

    options = {
        scale: {
            angleLines: {
                display: false
            },
            ticks: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    };

    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

function generateDataPuls() {

    // const pulsaciones = user.pulsaciones;
    const pulsaciones = 59;
    const edad = user.edad;
    const sexo = user.sexo;
    let mal, normal, bien, excelente;
    let data, labels, backgroundColor, borderColor = [];

    if (sexo == 'hombre') {

        if (edad <= 29) {
            mal = 86; normal = 70; bien = 62; excelente = 60;
        }
        else if (edad > 29 && edad <= 39) {
            mal = 86; normal = 72; bien = 64; excelente = 62;
        }
        else if (edad > 39 && edad <= 49) {
            mal = 90; normal = 74; bien = 66; excelente = 64;
        }
        else if (edad > 50) {
            mal = 90; normal = 76; bien = 68; excelente = 66;
        }
    }


    if (pulsaciones <= excelente) {

        data = [pulsaciones, Math.floor(excelente-pulsaciones), Math.floor(bien-excelente), Math.floor (normal-bien), Math.floor(mal-normal)];
        backgroundColor = [verde, morado, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro, lightNegro];
        labels = ['tu Pulso', 'excelente', 'bien', 'normal', 'mal'];
    }

    else if (pulsaciones > excelente && pulsaciones <= bien) {

        data = [pulsaciones, bien - pulsaciones, normal, mal];
        backgroundColor = [verde, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro];
        labels = ['tu Pulso', 'bien', 'normal', 'mal'];
    }

    data = {
        datasets: [{
            data,
            backgroundColor,
            borderColor
        }],
        labels
    };

    return data;
}

function generateDataIMC() {

    const IMC = Math.floor(user.peso / (user.altura * user.altura));
    let valor1 = 18.5;
    let valor2 = 25;
    let valor3 = 29.9;
    let valor4 = 49.9;
    let data, labels, backgroundColor, borderColor = [];

    if (IMC <= valor1) {

        data = [IMC, Math.floor(valor1-IMC), Math.floor(valor2-valor1), Math.floor(valor3-valor2), Math.floor(valor4-valor3)];
        backgroundColor = [verde, morado, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro, lightNegro];
        labels = ['tu IMC', 'insuficiente', 'normal', 'sobrepeso', 'obesidad'];
    }

    else if (IMC > valor1 && IMC <= valor2) {

        data = [IMC, Math.floor(valor2-IMC), Math.floor(valor3-valor2), Math.floor(valor4-valor3)];
        backgroundColor = [verde, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro];
        labels = ['tu IMC', 'normal', 'sobrepeso', 'obesidad'];

    }
    else if (IMC > valor2 && IMC <= valor3) {

        data = [IMC,  Math.floor(valor3-IMC), Math.floor(valor4-valor3)];
        backgroundColor = [verde, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro];
        labels = ['tu IMC', 'sobrepeso', 'obesidad'];

    }
    else if (IMC > valor3 && IMC <= valor4) {

        data = [IMC, Math.floor(valor4-IMC)];
        backgroundColor = [verde, rojo];
        borderColor = [negro, lightNegro];
        labels = ['tu IMC', 'obesidad'];

    }

    data = {
        datasets: [{
            data,
            backgroundColor,
            borderColor
        }],
        labels
    };
   
    return data;
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

    // chart();
    generateDataIMC();
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
    dataContainer.setAttribute('id', 'salud');
    mainContainer.appendChild(dataContainer);

    const dataIMC = document.createElement('div');
    dataContainer.appendChild(dataIMC);

    const headerIMC = document.createElement('div');
    headerIMC.classList.add('headerSubMenus');
    dataIMC.appendChild(headerIMC);

    const titleIMC = document.createElement('p');
    titleIMC.innerHTML = 'IMC';
    headerIMC.appendChild(titleIMC);

    const canvasIMC = document.createElement('canvas');
    canvasIMC.setAttribute('id', 'IMC');
    canvasIMC.classList.add('grafico');
    dataIMC.appendChild(canvasIMC);
    let dataDoughnutIMC = generateDataIMC();
    createDoughnut(canvasIMC, dataDoughnutIMC);

    const dataPulsaciones = document.createElement('div');
    dataContainer.appendChild(dataPulsaciones);

    const headerPuls = document.createElement('div');
    headerPuls.classList.add('headerSubMenus');
    dataPulsaciones.appendChild(headerPuls);

    const titlePuls = document.createElement('p');
    titlePuls.innerHTML = 'PULSACIONES';
    headerPuls.appendChild(titlePuls);

    const canvasPulsaciones = document.createElement('canvas');
    canvasPulsaciones.setAttribute('id', 'pulsaciones');
    canvasPulsaciones.classList.add('grafico');
    dataPulsaciones.appendChild(canvasPulsaciones);
    let dataDoughnutPuls = generateDataPuls();
    createDoughnut(canvasPulsaciones, dataDoughnutPuls);
    

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

                    (y == 0) ? cell.innerHTML = diasSemana[i - 1] : cell.innerHTML = ejercicios[i - 1];
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
    chart();

    /* NOTA: para borrar localstorage es : localStorage.remove('user'); */

}


/* VARIABLES GLOBALES*/
// objeto user = obtiene en init todos los datos que se mostraran en su perfil
let user;
//Colores para graficos
const verde = 'rgba(36,242, 33, 1)';
const naranja = 'rgba(217,158, 98, 0.3)';
const morado = 'rgba(217,158, 217, 0.3)';
const amarillo = 'rgba(217,217, 98, 0.3)';
const rojo = 'rgba(255, 99, 132, 0.3)';
const negro = 'rgba(15, 0, 7, 1)';
const lightNegro = 'rgba(15, 0, 7, 0.1)';


window.addEventListener('load', init);