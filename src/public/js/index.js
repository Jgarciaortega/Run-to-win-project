

// function fijarHeader() {

//     // Get the header
//     var header = document.querySelector('header');

//     // Get the offset position of the navbar
//     var sticky = header.offsetTop;

//     if (window.pageYOffset > sticky) {
//         header.classList.add("sticky");
//     } else {
//         header.classList.remove("sticky");
//     }

// }


function init(){

   document.querySelector('.menu-btn').addEventListener('click', () => {
       document.querySelector('.nav-menu').classList.toggle('show');
   })
}

window.addEventListener('load', init);
// window.addEventListener('scroll', fijarHeader);


