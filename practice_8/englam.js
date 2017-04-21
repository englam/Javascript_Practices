
var model = {
	ships_total : 3,
	boardSize : 7,
	ship_length : 3 ,
	hited_ships : 0 ,

	ships : [{locations : ["01", "02", "03"] , hits : ["","",""]},
			{locations : ["04", "05", "06"] , hits : ["","",""]},
			{locations : ["11", "12", "13"] , hits : ["","",""]},
	],

	fire : function(guess) {

		//console.log(model.ships[0].locations[0]);
		//console.log(model.ships[0].locations[1]);
		for (var i = 0 ; i < this.ships_total; i++)
		{
			var ships = model.ships[i];
			//console.log(ships.locations);
			index = ships.locations.indexOf(guess);
			//console.log(index);
			if (ships.hits[index] === "hit")
			{
				view.displayMessage("Hit it again !!");
				return true;
			}
			else if (index >= 0)
			{
				ships.hits[index] = "hit";
				view.displayMessage("You hit it !!");
				view.displayHit(guess);
				//console.log(ships.hits);

				if (this.is_sunk(ships))
				{
					this.hited_ships++;
					//console.log(this.hited_ships);
					view.displayMessage("You sank one of my ship !!");
				}


				return true;
			}





		}

		view.displayMessage("You missed it !!");
		view.displayMiss(guess);
		return false;

	},

	is_sunk : function (ship)
	{
		for (var i =0 ; i < this.ships_total; i++)
		{
			
			//console.log(ship.hits[i]);
			if (ship.hits[i] !== "hit")
			{
				return false;
			}
		}

		return true;

	},
	
	generate_shiplocation : function()
	{
		var locations;
		for (var i = 0 ; i < this.ships_total ; i++)
		{
			//console.log(this.generate_ships());
			//this.generate_ships();

			do{
				locations = this.generate_ships();
			}while(this.collision(locations))
			this.ships[i].locations = locations
			//console.log(this.ships[i].locations)

		}
	},

	collision : function(locations)
	{
		//console.log(locations);
		for (var i = 0 ; i < this.ships_total ; i++)
		{	
			var ship = this.ships[i];
			
			for (var j = 0 ; j < locations.length; j++)
			{
				//console.log(locations.length);
				//console.log(j);
				if (ship.locations.indexOf(locations[j]) >= 0)
				{
					return true;
				}
			}
		}

		return false;


	},

	generate_ships : function()
	{

		direction = Math.floor(Math.random() * 2);
		var col , row;
		//console.log(direction);


		if (direction === 1)
		{
			col = Math.floor(Math.random() * (this.boardSize - 3) );
			row = Math.floor(Math.random() * this.boardSize);
		}
		else
		{
			col = Math.floor(Math.random() * this.boardSize);
			row = Math.floor(Math.random() * (this.boardSize - 3));
		}

		//console.log(col);
		//console.log(row);

		var newship = [];

		for (var i = 0 ; i < this.ships_total ; i++)
		{
			if (direction === 1)
			{
				newship.push(row + "" + (col + i));
			}
			else
			{
				newship.push((row+i) + "" + col);
			}
			
		}

		return newship;


	},



};



var view = {

	displayMessage : function(msg){
		var message = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit : function(guess){
		var cell = document.getElementById(guess);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(guess){
		var cell = document.getElementById(guess);
		cell.setAttribute("class", "miss");
	},

};

function fire_button(){
	var input_value = document.getElementById("guessInput");
	value = input_value.value;
	//console.log(value);
	control.process(value);
	input_value.value="";

};



function valid_value(guess){

	//console.log(guess);
	test = ["A","B","C","D","E","F", "G"];
	first_character = guess.charAt(0);
	second_character = guess.charAt(1);

	first_character = test.indexOf(first_character);
	//console.log(first_character);

	if (guess === null || guess.length !== 2)
	{
		alert ("Value out of range !!");
	}
	else if (isNaN(first_character) || isNaN(second_character))
	{
		alert ("Input error value !!");
		// input "GG" to test
	}
	else if (first_character < 0 || first_character >= model.boardSize || second_character < 0 || second_character >= model.boardSize)
	{
		alert ("Input value out of range !!");
	}
	else
	{
		return first_character  + second_character;
	}

	return null;

};

var control = {
	guesses : 0 ,

	process : function(guess){
		//console.log(guess);
		//valid_value(guess);
		//console.log(valid_value(guess));
		if (valid_value(guess))
		{
			//console.log(valid_value(guess));
			var hit = model.fire(valid_value(guess));
			//console.log(hit);
			this.guesses++;
			//console.log(this.guesses);
			if (hit && model.hited_ships === model.ships_total )
			{
				//console.log("all of ships are down");
				view.displayMessage("All ships are down");
			}
		}
	}

};

function init(){
	var input = document.getElementById("fireButton");
	input.onclick = fire_button;

	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generate_shiplocation();
	//model.generate_ships();
	//console.log(model.generate_ships());

};

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}


window.onload = init; //從init 開始


//view.displayHit("00");
//view.displayMiss("01");
//model.fire("02");
//model.fire("32");
//model.fire("01");
//model.fire("04");