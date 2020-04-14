

function fijarHeader() {

    // Get the header
    var header = document.querySelector('header');

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

}


function init() {

}

window.addEventListener('scroll', fijarHeader);
window.addEventListener('load', init);