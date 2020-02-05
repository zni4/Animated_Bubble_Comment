function mostrarBurbuja() {
    document.getElementById("comentario").classList.remove("invisible");
    document.getElementById("comentario").classList.add("visible");
}

function ocultarBurbuja() {
    document.getElementById("comentario").classList.add("invisible");
    document.getElementById("comentario").classList.remove("visible");
}


function mostrarBurbuja2() {
    document.getElementById("comentario2").classList.remove("oculto");
    document.getElementById("comentario2").classList.add("visible");
}

function ocultarBurbuja2() {
    document.getElementById("comentario2").classList.add("oculto");
    document.getElementById("comentario2").classList.remove("visible");
}

function mostrarBurbuja3(id) {

    if (document.getElementsByClassName('resaltar')[0] != null) {
        document.getElementsByClassName('resaltar')[0].classList.remove('resaltar'); //quitamos el texto resaltado
    }
    document.getElementById(id).classList.add('resaltar'); //resaltamos el texto

    var divModal = document.getElementById('comentario3');

    var comentario = document.getElementById('comentario3');

    if (divModal != null) {
        comentario.parentNode.removeChild(comentario);
    }

    //Obtenemos el contenedor y e incluimos el elemento
    var divNodo = document.getElementById('contenedor_comentario_' + id);

    var texto = document.getElementById(id).innerText;

    divNodo.innerHTML += '<div id="comentario3" class="bubble_comment_left3"><div class="closeButton" onclick="ocultarBurbuja3();">CERRAR &times</div>' + texto + '</div>';
    
    divModal = divNodo;
}

function ocultarBurbuja3() {
    document.getElementsByClassName('resaltar')[0].classList.remove('resaltar'); //quitamos el texto resaltado

    var divModal = document.getElementById('comentario3');

    var comentario = document.getElementById('comentario3');

    if (divModal != null) {
        comentario.parentNode.removeChild(comentario);
    }
}

//Para cambiar el modo de oscuro a claro y viceversa

function CambiarModo() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    if (toggleSwitch.checked === true) {
        document.documentElement.setAttribute('tema', 'oscuro');
        document.getElementById('modo').innerHTML = 'Modo OSCURO';
    }
    else {
        document.documentElement.setAttribute('tema', 'claro');
        document.getElementById('modo').innerHTML = 'Modo CLARO';
    }
}
