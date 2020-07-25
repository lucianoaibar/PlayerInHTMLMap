(function() {
	'use strict';

	//_________________________________________________________________________
	// Variables
	var div_mapa;
	var	Ancho = 32;
	var Alto = 32;
	var Mapa = [];

	var Celda_Tipos = [
		'vacio',
		'pasto',
		'tierra',
		'agua'
	];

	var Celda_Tipo_Max;

	//_________________________________________________________________________
	var Iniciar = function() {
		div_mapa = document.getElementById('div_mapa');
		div_mapa.addEventListener('click', Mapa_Click);
		Cargar_Mapa();
		Render();
	};

	//_________________________________________________________________________
	var Cargar_Mapa = function() {
		Celda_Tipo_Max = Celda_Tipos.length - 1;
		Mapa.length = Ancho * Alto;
		Mapa.fill(0);
	};

	//_________________________________________________________________________
	var Render = function() {

		var indice;
		var	x, y;
		var	resultado;
		var	indice_tipo;

		indice = 0;
		resultado = '';
		for(y=0;y<Alto;y++) {
			resultado += '<ul>';
			for(x=0;x<Ancho;x++) {

				indice_tipo = Mapa[indice];

				resultado +=
					'<li indice="' + indice + '" class="' + Celda_Tipos[indice_tipo] + '"></li>';

				indice++;
			}
			resultado += '</ul>';
		}
		div_mapa.innerHTML = resultado;
	};

	//_________________________________________________________________________
	var Mapa_Click = function(evento) {
		if(evento.target.tagName=='LI') {
			var indice	= parseInt(evento.target.getAttribute('indice'));

			var tipo = Mapa[indice];
			//Mapa[indice] = tipo==Celda_Tipo_Max ? 0 : ++tipo;

			Render();
		}
	};

	//_________________________________________________________________________
	Iniciar();

})();