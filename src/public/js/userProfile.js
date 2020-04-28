/* FUNCIONES GENERALES */

const sleep = m => new Promise(r => setTimeout(r, m))

async function temp () {
    await sleep(2000);
}


function clearLeftNav() {

    const nav = document.getElementById('leftMenu');
    const items = nav.children[0].children;

    for (item of items) {

        if (item.classList.contains('itemNavSelected')) {

            item.classList.remove('itemNavSelected');
        }

    }
}

async function showLoadCircle(mainContainer) {

    const loadContainer = document.createElement('div');
    loadContainer.setAttribute('id', 'loadContainer');
    mainContainer.appendChild(loadContainer);

    const loadCircle = document.createElement('div');
    loadCircle.setAttribute('id', 'load');
    loadContainer.appendChild(loadCircle);

    await setTimeout(() => { mainContainer.removeChild(loadContainer); return true; }, 2000)

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
        data: data,
        options: {
            animation: {
                duration: 2000 // general animation time
            },
            hover: {
                animationDuration: 500 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }

    });
}

function generateDataPuls() {

    const pulsaciones = user.pulsaciones;
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

        data = [pulsaciones, Math.floor(excelente - pulsaciones), Math.floor(bien - excelente), Math.floor(normal - bien), Math.floor(mal - normal)];
        backgroundColor = [verde, morado, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro, lightNegro];
        labels = ['tu Pulso', 'excelente', 'bien', 'normal', 'mal'];
        user.diagnosticPuls = 'Diagnóstico : Sus pulsaciones están en un rango excelente';
    }

    else if (pulsaciones > excelente && pulsaciones <= bien) {

        data = [pulsaciones, bien - pulsaciones, normal, mal];
        backgroundColor = [verde, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro];
        labels = ['tu Pulso', 'bien', 'normal', 'mal'];
        user.diagnosticPuls = 'Diagnóstico : Sus pulsaciones están en buen rango';
    }

    else if (pulsaciones > bien && pulsaciones <= normal) {

        data = [pulsaciones, normal - pulsaciones, mal];
        backgroundColor = [verde, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro];
        labels = ['tu Pulso', 'normal', 'mal'];
        user.diagnosticPuls = 'Diagnóstico : Sus pulsaciones están en un rango normal';
    }

    else if (pulsaciones > normal && pulsaciones <= mal) {

        data = [pulsaciones, mal - pulsaciones];
        backgroundColor = [verde, rojo];
        borderColor = [negro, lightNegro];
        labels = ['tu Pulso', 'mal'];
        user.diagnosticPuls = 'Diagnóstico : Sus pulsaciones están en un rango malo';

    }

    else if (pulsaciones > mal) {

        data = [pulsaciones];
        backgroundColor = [rojo];
        borderColor = [negro];
        labels = ['tu Pulso'];
    }

    return parseData(data, backgroundColor, borderColor, labels);
}

function generateDataIMC() {

    const IMC = Math.floor(user.peso / (user.altura * user.altura));
    let valor1 = 18.5;
    let valor2 = 25;
    let valor3 = 29.9;
    let valor4 = 49.9;
    let data, labels, backgroundColor, borderColor = [];

    if (IMC <= valor1) {

        data = [IMC, Math.floor(valor1 - IMC), Math.floor(valor2 - valor1), Math.floor(valor3 - valor2), Math.floor(valor4 - valor3)];
        backgroundColor = [verde, morado, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro, lightNegro];
        labels = ['tu IMC', 'insuficiente', 'normal', 'sobrepeso', 'obesidad'];
        user.diagnosticIMC = 'Diagnóstico: Su IMC está en rango de peso insuficiente';
    }

    else if (IMC > valor1 && IMC <= valor2) {

        data = [IMC, Math.floor(valor2 - IMC), Math.floor(valor3 - valor2), Math.floor(valor4 - valor3)];
        backgroundColor = [verde, amarillo, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro, lightNegro];
        labels = ['tu IMC', 'normal', 'sobrepeso', 'obesidad'];
        user.diagnosticIMC = 'Diagnóstico: Su IMC está en el rango normal';

    }
    else if (IMC > valor2 && IMC <= valor3) {

        data = [IMC, Math.floor(valor3 - IMC), Math.floor(valor4 - valor3)];
        backgroundColor = [verde, naranja, rojo];
        borderColor = [negro, lightNegro, lightNegro];
        labels = ['tu IMC', 'sobrepeso', 'obesidad'];
        user.diagnosticIMC = 'Diagnóstico: Su IMC está en rango de sobrepeso';

    }
    else if (IMC > valor3 && IMC <= valor4) {

        data = [IMC, Math.floor(valor4 - IMC)];
        backgroundColor = [verde, rojo];
        borderColor = [negro, lightNegro];
        labels = ['tu IMC', 'obesidad'];
        user.diagnosticIMC = 'Diagnóstico: Su IMC está en rango de obesidad';

    }

    return parseData(data, backgroundColor, borderColor, labels);
}

function generateDataPoints() {

    let rangoPuntos;

    switch (user.status) {

        case ('beginner'): rangoPuntos = 1000; break;
        case ('intermediate'): rangoPuntos = 1500; break;
        case ('pro'): rangoPuntos = 3000; break;

    }

    data = [user.puntuacion, rangoPuntos - user.puntuacion];
    backgroundColor = [verde, rojo];
    borderColor = [negro, lightNegro];
    labels = ['tus puntos', 'nivel'];

    const dataPoints = parseData(data, backgroundColor, borderColor, labels);
    const element = document.getElementById('statusChart');

    createDoughnut(element, dataPoints);

}

function parseData(data, backgroundColor, borderColor, labels) {

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
    const photo = document.getElementById('photo');
    const points = document.getElementById('points');

    const imgPhoto = document.createElement('img');
    imgPhoto.setAttribute('src', user.imagen);
    imgPhoto.setAttribute('alt', 'Imagen del usuario');
    photo.appendChild(imgPhoto);

    nickname.innerHTML = user.nickname;
    level.innerHTML = user.status;
    achievements.innerHTML = user.logros;
    points.innerHTML = user.puntuacion;

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

    // borramos primero si hay algun element del nav seleccionado
    clearLeftNav();

    /*marcamos el item del nav como seleccionado*/
    // si el elemento viene al pulsar sobre el enlace...
    if (this == document.getElementById('inicio')) {
        this.classList.add('itemNavSelected');
        // ... si se carga inicio sin pulsar el enlace(cuando carga inicialmente el perfil de usuario)    
    } else {
        document.getElementById('inicio').classList.add('itemNavSelected');
    }

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'inicioBanner');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloUpDown');
    textPortada.innerHTML = 'INICIO';
    inicioContainer.appendChild(textPortada);

}

function muestraInforme() {

    // borramos primero si hay algun element del nav seleccionado
    clearLeftNav();
    // marcamos el item del nav como seleccionado
    this.classList.add('itemNavSelected');

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'informesBanner');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloUpDown');
    textPortada.innerHTML = 'INFORMES';
    inicioContainer.appendChild(textPortada);

}

async function muestraSalud() {

    // borramos primero si hay algun element del nav seleccionado
    clearLeftNav();
    // marcamos el item del nav como seleccionado
    this.classList.add('itemNavSelected');

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'saludBanner');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloDownUp');
    textPortada.innerHTML = 'SALUD';
    inicioContainer.appendChild(textPortada);

    showLoadCircle(mainContainer);
    await temp();
    // contenido salud
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('subMenu');
    dataContainer.setAttribute('id', 'mainSalud');
    mainContainer.appendChild(dataContainer);

    const IMC = document.createElement('div');
    dataContainer.appendChild(IMC);

    const headerIMC = document.createElement('div');
    headerIMC.classList.add('headerSubMenus');
    IMC.appendChild(headerIMC);

    const titleIMC = document.createElement('p');
    titleIMC.innerHTML = 'IMC';
    headerIMC.appendChild(titleIMC);

    const dataIMC = document.createElement('div');
    dataIMC.classList.add('contenidoSubMenu');
    IMC.appendChild(dataIMC);

    const chartIMC = document.createElement('div');
    chartIMC.classList.add('grafico');
    dataIMC.appendChild(chartIMC);

    const canvasIMC = document.createElement('canvas');
    chartIMC.appendChild(canvasIMC);

    let dataDoughnutIMC = generateDataIMC();
    createDoughnut(canvasIMC, dataDoughnutIMC);

    const infoIMC = document.createElement('div');
    dataIMC.appendChild(infoIMC);

    const diagnosticIMC = document.createElement('p');
    diagnosticIMC.classList.add('diagnosticText');
    diagnosticIMC.innerHTML = user.diagnosticIMC;
    infoIMC.appendChild(diagnosticIMC);

    const pulsaciones = document.createElement('div');
    dataContainer.appendChild(pulsaciones);

    const headerPuls = document.createElement('div');
    headerPuls.classList.add('headerSubMenus');
    pulsaciones.appendChild(headerPuls);

    const titlePuls = document.createElement('p');
    titlePuls.innerHTML = 'TUS PULSACIONES';
    headerPuls.appendChild(titlePuls);

    const dataPulsaciones = document.createElement('div');
    dataPulsaciones.classList.add('contenidoSubMenu');
    pulsaciones.appendChild(dataPulsaciones);

    const chartPulsaciones = document.createElement('div');
    chartPulsaciones.classList.add('grafico');
    dataPulsaciones.appendChild(chartPulsaciones);

    const canvasPulsaciones = document.createElement('canvas');
    chartPulsaciones.appendChild(canvasPulsaciones);

    let dataDoughnutPuls = generateDataPuls();
    createDoughnut(canvasPulsaciones, dataDoughnutPuls);

    const infoPuls = document.createElement('div');
    dataPulsaciones.appendChild(infoPuls);

    const diagnosticPuls = document.createElement('p');
    diagnosticPuls.classList.add('diagnosticText');
    diagnosticPuls.innerHTML = user.diagnosticPuls;
    infoPuls.appendChild(diagnosticPuls);
}

async function muestraRutina() {

    // borramos primero si hay algun element del nav seleccionado
    clearLeftNav();
    // marcamos el item del nav como seleccionado
    this.classList.add('itemNavSelected');

    const mainContainer = document.getElementById('center');
    limpiarNodo(mainContainer);
    // div portada inicio
    const inicioContainer = document.createElement('div');
    inicioContainer.classList.add('banner');
    inicioContainer.setAttribute('id', 'rutinaBanner');
    mainContainer.appendChild(inicioContainer);

    // contenido portada
    const textPortada = document.createElement('p');
    textPortada.classList.add('tituloDownUp');
    textPortada.innerHTML = 'RUTINAS';
    inicioContainer.appendChild(textPortada);

    // descargamos la rutina del usuario(dato estatico para realizar pruebas)
    const rutina = await loadRutine(1);

    showLoadCircle(mainContainer);
    await temp();

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
    tabla.classList.add('contenidoSubMenu');
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
}

async function init() {

    //1º obtenemos el id usuario 
    let localStorageInfo = JSON.parse(localStorage.getItem('user'));
    //2º con el id obtenemos el usario
    user = await loadInfoUser(localStorageInfo);
    //3º mostramos la info basica del perfil
    showInfoUser(user);
    //4º cargamos el menu inicio
    muestraInicio();
    //5º carga los puntos del usuario y los muestra en grafico puntuacion
    generateDataPoints();

    // listeners menu lateral
    document.getElementById('inicio').addEventListener('click', muestraInicio);
    document.getElementById('informe').addEventListener('click', muestraInforme);
    document.getElementById('salud').addEventListener('click', muestraSalud);
    document.getElementById('rutinaEjercicios').addEventListener('click', muestraRutina);

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