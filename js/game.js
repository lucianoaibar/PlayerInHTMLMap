(function() {
	'use strict';

	//_________________________________________________________________________
	// Variables
	var	div_view;
	var	btn_download_map;
	var	Width = 32;
	var Heigth = 32;

	var CellTypes = [
		'vacio',
		'pasto',
		'tierra',
		'agua'
	];

	var CurrentCellType;
	var player;

	//_________________________________________________________________________
	var Main = function() {
		div_view = document.getElementById('div_view');
		div_view.addEventListener('click', Map_Click);

		btn_download_map = document.getElementById('btn_download_map');
		btn_download_map.addEventListener('click', Download_Map);
		
		player = new Player();

		CurrentCellType = 1;

		keyboardJS.bind('1', null, OnCellType1);
		keyboardJS.bind('2', null, OnCellType2);
		keyboardJS.bind('3', null, OnCellType3);
		keyboardJS.bind('4', null, OnCellType4);

		keyboardJS.bind('w', null, OnKeyW);
		keyboardJS.bind('a', null, OnKeyA);
		keyboardJS.bind('s', null, OnKeyS);
		keyboardJS.bind('d', null, OnKeyD);

		Render();
	};

	//_________________________________________________________________________
	var Render = function() {

		var idx;
		var	x, y;
		var	result;
		var	indice_tipo;
		var	player_in_map_idx;

		player_in_map_idx = Width * player.y + player.x;
		
		idx = 0;
		result = '';
		for(y=0;y<Heigth;y++) {
			result += '<ul>';
			for(x=0;x<Width;x++) {

				indice_tipo = MAP_TERRAIN[idx];

				result += '<li mapidx="' + idx + '" class="' + CellTypes[indice_tipo];
				if(idx==player_in_map_idx) {
					result += ' player';
				}
				result += '"></li>';

				idx++;
			}
			result += '</ul>';
		}
		div_view.innerHTML = result;
	};

	//_________________________________________________________________________
	var Map_Click = function(e) {
		if(e.target.tagName=='LI') {
			var mapidx	= parseInt(e.target.getAttribute('mapidx'));
			MAP_TERRAIN[mapidx] = CurrentCellType;
			Render();
		}
	};

	//_________________________________________________________________________
	var OnCellType1 = function() {
		CurrentCellType = 0;
	};
	var OnCellType2 = function() {
		CurrentCellType = 1;
	};
	var OnCellType3 = function() {
		CurrentCellType = 2;
	};
	var OnCellType4 = function() {
		CurrentCellType = 3;
	};

	//_________________________________________________________________________
	var OnKeyW = function() {
		if(player.y>0) player.y--;
		Render();
	}
	var OnKeyA = function() {
		if(player.x>0) player.x--;
		Render();
	}
	var OnKeyS = function() {
		if(player.y<(Heigth-1)) player.y++;
		Render();
	}
	var OnKeyD = function() {
		if(player.x<(Width-1)) player.x++;
		Render();
	}

	//_________________________________________________________________________
	class Player {
		constructor() {
			this.x = 10;
			this.y = 10;
		}
	}

	//_________________________________________________________________________
	var Download_Map = function() {
		var mapa_data = 'var MAP_TERRAIN=' + JSON.stringify(MAP_TERRAIN);
		download(mapa_data, 'map.js', 'text/plain');
	};

	//_________________________________________________________________________
	Main();

})();