(function() {
	'use strict';

	//_________________________________________________________________________
	// Variables
	var div_view;
	var	Width = 32;
	var Heigth = 32;
	var Map = [];

	var CellTypes = [
		'vacio',
		'pasto',
		'tierra',
		'agua'
	];

	var MaxCellType;
	var player;

	//_________________________________________________________________________
	var Main = function() {
		div_view = document.getElementById('div_view');
		div_view.addEventListener('click', Map_Click);
		
		player = new Player();

		keyboardJS.bind('w', null, OnKeyW);
		keyboardJS.bind('a', null, OnKeyA);
		keyboardJS.bind('s', null, OnKeyS);
		keyboardJS.bind('d', null, OnKeyD);

		Load_Map();
		Render();
	};

	//_________________________________________________________________________
	var Load_Map = function() {
		MaxCellType = CellTypes.length - 1;
		Map.length = Width * Heigth;
		Map.fill(0);
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

				indice_tipo = Map[idx];

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

			var celltype = Map[mapidx];
			Map[mapidx] = celltype==MaxCellType ? 0 : ++celltype;

			Render();
		}
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
	Main();

})();