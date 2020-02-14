function mostrarBurbuja() {
	document.getElementById('comentario').classList.remove('invisible');
	document.getElementById('comentario').classList.add('visible');
}

function ocultarBurbuja() {
	document.getElementById('comentario').classList.add('invisible');
	document.getElementById('comentario').classList.remove('visible');
}

function mostrarBurbuja2() {
	document.getElementById('comentario2').classList.remove('oculto');
	document.getElementById('comentario2').classList.add('visible');
}

function ocultarBurbuja2() {
	document.getElementById('comentario2').classList.add('oculto');
	document.getElementById('comentario2').classList.remove('visible');
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

	divNodo.innerHTML +=
		'<div id="comentario3" class="bubble_comment_left3" onmouseover="aumentarTexto(ampliarTexto);" onmouseout="textoSinAmpliar();"><div class="closeButton" onclick="ocultarBurbuja3();">' + TraducirClave("cerrar") + ' &times</div>' +
		texto +
		'</div>';

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
	const toggleSwitch = document.querySelector('#cambioModo');

	if (toggleSwitch.checked === true) {
		document.documentElement.setAttribute('tema', 'oscuro');
		document.getElementById('modo').innerHTML = TraducirClave('oscuro');
	} else {
		document.documentElement.setAttribute('tema', 'claro');
		document.getElementById('modo').innerHTML = TraducirClave('claro');
    }
}

function CambiarLetra() {
	const toggleSwitch = document.querySelector('#cambioLetra');

	if (toggleSwitch.checked === true) {
		document.documentElement.setAttribute('letra', 'alternativa');
	} else {
		document.documentElement.setAttribute('letra', 'original');
	}
}

var ampliarTexto = false;

function activarAmpliarTexto() {
	const toggleSwitch = document.querySelector('#ampliarTexto');

	if (toggleSwitch.checked === true) {
		ampliarTexto = true;
	} else {
		ampliarTexto = false;
	}
}

function aumentarTexto(ampliarTexto) {
	if (ampliarTexto === true) {
		document.getElementById('comentario3').classList.add('ampliar_bubble_text');
	} else {
		document
			.getElementById('comentario3')
			.classList.remove('ampliar_bubble_text');
	}
}

function textoSinAmpliar() {
	document
		.getElementById('comentario3')
		.classList.remove('ampliar_bubble_text');
}

function activarCheckbox(checkbox_id) {
	if (document.getElementById(checkbox_id).checked === true) {
		document.getElementById(checkbox_id).checked = false;
	} else {
		document.getElementById(checkbox_id).checked = true;
    }
}

var mIdiomaActual;

var mContenidoSinTraducir;

function informarContenidoSinTraducir() {
    if (mContenidoSinTraducir === undefined && document.body.innerHTML !== undefined) {
        mContenidoSinTraducir = document.body.innerHTML
    }
    seleccionarIdioma('Español');
}


function seleccionarIdioma(idioma) {
    if (idioma === 'Español') {
        mIdiomaActual = 'ES';
    }
    else if (idioma === 'Ingles') {
        mIdiomaActual = 'EN';
    }

    var contenidoSinTraducir = mContenidoSinTraducir
    TraducirPagina(contenidoSinTraducir, mIdiomaActual);

    if (idioma === 'Español') {
        document.getElementById('idiomaSeleccionado').src = "./images/Español.png";
    }
    else if (idioma === 'Ingles') {
        document.getElementById('idiomaSeleccionado').src = "./images/Ingles.png";
    }
}

function TraducirLiteral(literal, idioma) {
    if (literal != null) {
        if (idioma == undefined) {
            idioma = mIdiomaActual;
        }
        if (idioma == null || idioma == "") { idioma = 'ES' };
        if (literal.indexOf('<' + idioma + '>') != -1) {
            inicio = literal.indexOf('<' + idioma + '>');
            inicio += ('<' + idioma + '>').length
            fin = literal.lastIndexOf('</' + idioma + '>');
            valorOriginal = literal.substring(inicio, fin);
            return valorOriginal
        }
        else {
            return literal
        }
    }
    else {
        return ''
    }
}

function TraducirClave(clave, idioma) {

    if (idioma == undefined) {
        idioma = mIdiomaActual;
    }

    var rutaLiterales = './Literales.xml';

    var textoTraducido = "";

    //Obtener la traducción de la clave
    var xmlDoc = AbrirFichero(rutaLiterales);

    for (j = 0; j < xmlDoc.getElementsByTagName('Literal').length; j++) {
        if (clave === xmlDoc.getElementsByTagName('Literal')[j].getAttribute('Id')) {
            textoTraducido = xmlDoc.getElementsByTagName(idioma)[j].childNodes[0].nodeValue;
            j = xmlDoc.getElementsByTagName('Literal').length; //Para salir del bucle
        }
    }
    return textoTraducido;
}

function TraducirPagina(contenidoSinTraducir, idioma) {
    var contenido = contenidoSinTraducir;

    var rutaLiterales = './Literales.xml';

    let numeroTraducciones = contenido.match(new RegExp('{', 'g')).length;

    var textoTraducido = "";

    //Obtener la traducción de la clave
    var xmlDoc = AbrirFichero(rutaLiterales);

    for (i = 0; i < numeroTraducciones; i++) {

        let posicioninicial = contenido.indexOf('{') + 1;
        let posicionfinal = contenido.indexOf('}');
        let clave = contenido.substr(posicioninicial, (posicionfinal - posicioninicial));

        for (j = 0; j < xmlDoc.getElementsByTagName('Literal').length; j++) {
            if (clave === xmlDoc.getElementsByTagName('Literal')[j].getAttribute('Id')) {
                textoTraducido = xmlDoc.getElementsByTagName(idioma)[j].childNodes[0].nodeValue;
                j = xmlDoc.getElementsByTagName('Literal').length; //Para salir del bucle
            }
        }
        contenido = contenido.replace("{" + clave + "}", textoTraducido);

        document.body.innerHTML = contenido;
    }
}

function AbrirFichero(fichXML) {
    var xmlDoc = undefined;
    try {
        if (document.all) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        } else {
            xmlDoc = document.implementation.createDocument("", "", null);
        }
        xmlDoc.async = false;
        xmlDoc.load(fichXML);
    } catch (e) {
        try { //otros safari, chrome
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", fichXML, false);
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML.documentElement;
            return xmlDoc;
        }
        catch (e) {
            return undefined;
        }
    }
    return xmlDoc;
}

function MostrarMensaje(textoMensaje) {

    var cabeceraMensaje = "¿Idioma?";
    var imagen = "imagen_question";

    var divModal = document.getElementById('Mensaje');

    var pMensajeError =
        textoMensaje === undefined || textoMensaje === '' ? '' : textoMensaje;

    var mensaje = document.getElementById('Mensaje');

    if (divModal != null) {
        mensaje.parentNode.removeChild(mensaje); //Elimina el mensaje si este ya existe
    }

    //Obtenemos el body y creamos el elemento
    var divBody = document.getElementsByTagName('body')[0];
    var divNodo = document.createElement('div');

    divNodo.id = 'Mensaje';
    divNodo.innerHTML = '<div class="contenedor_mensaje"></div>';
    divBody.appendChild(divNodo);
    divModal = divNodo;

    divModal.innerHTML +=
        '<div class="MensajeAviso"><div class="cabecera"><button onclick="OcultarMensaje();">&times;</button><h4>' +
        cabeceraMensaje +
        '</h4></div><div class="body"><span class="' +
        imagen + '"></span><p>' + textoMensaje +
    '</p></div><div class="footer"><input type="image" class="img_button" src="./images/Español.png" onclick="Responder(' + '1' + ');"></input><input type="image" class="img_button" src="./images/Ingles.png" onclick="Responder(' + '0' + ');"></image></div></div>';
}

function OcultarMensaje() {
    var divModal = document.getElementById('Mensaje');

    var mensaje = document.getElementById('Mensaje');

    if (divModal != null) {
        mensaje.parentNode.removeChild(mensaje); // Elimina el mensaje
    }
}

function Responder(respuesta) {
    if (respuesta === 1) {
        seleccionarIdioma('Español');
    }
    else {
        seleccionarIdioma('Ingles');
    }

    OcultarMensaje();
}