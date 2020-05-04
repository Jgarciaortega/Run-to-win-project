/* Funciones Servidor */
async function putServer(url,newValue) {
    console.log('putServer');
    
    let body = {
        method: 'PUT',
        body: JSON.stringify(newValue),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, body);
    const data = await res.json();

    return data;

}

function saveChanges(){

    const sex = document.getElementById('sexo').value;
    const age = document.querySelector('input[name="edad"]').value;
    const email =  document.querySelector('input[name="email"]').value;
    const weight = document.querySelector('input[name="peso"]').value;
    const height = document.querySelector('input[name="altura"]').value;
    const pulsations = document.querySelector('input[name="pulsaciones_reposo"]').value;

    console.log('sexo: ' + sex);
    console.log('age: ' + age);
    console.log('email: ' + email);
    console.log('weight: ' + weight);
    console.log('height: ' + height);
    console.log('pulsations: ' + pulsations);
    
}


function modifyField(){

    let value = this.value;
    this.setAttribute('readonly','true');
    const name = this.getAttribute('name');

    if(name == 'email') value = '"' + value + '"';

    data = {
       name,
       value
    }
    
    putServer('/user/updateUser/'+user.id, data);
    
}


function editField(){
   
    const field = this.previousElementSibling;

    field.value = '';
    field.focus();
    field.removeAttribute('readonly');

    
}

function loadInfoUser(user){

    document.querySelector('input[name="nombre"]').value = user.nombre;
    document.querySelector('input[name="apellidos"]').value = user.apellidos;
    document.querySelector('input[name="nickname"]').value = user.nickname;
    document.querySelector('input[name="email"]').value = user.email;
    document.querySelector('input[name="peso"]').value = user.peso;
    if(user.altura != null )  document.querySelector('input[name="altura"]').value = user.altura.toFixed(2);
    document.querySelector('input[name="pulsaciones_reposo"]').value = user.pulsaciones;
    document.querySelector('input[name="puntuacion"]').value = user.puntuacion;
    document.querySelector('input[name="status"]').value = user.status;
}



async function init(){

      //Obtenemos el id del usuario
      userId = JSON.parse(localStorage.getItem('user'));
      user = await getServer('/user/findById/' + userId.id);

      loadInfoUser(user);

      // listener edit field
      const edit = document.getElementsByClassName('fa-edit');
      Array.from(edit).forEach(button => {
          button.addEventListener('click', editField);
      });
      // listener save changes
      document.getElementById('btnPersonalData').addEventListener('click', saveChanges);
        
}

window.addEventListener('load', init);