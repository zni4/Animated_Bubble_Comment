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
		'<div id="comentario3" class="bubble_comment_left3" onmouseover="aumentarTexto(ampliarTexto);" onmouseout="textoSinAmpliar();"><div class="closeButton" onclick="ocultarBurbuja3();">CERRAR &times</div>' +
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
		document.getElementById('modo').innerHTML = 'Modo OSCURO';
	} else {
		document.documentElement.setAttribute('tema', 'claro');
		document.getElementById('modo').innerHTML = 'Modo CLARO';
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
