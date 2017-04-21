var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],


// original hard-coded values for ship locations
/*
	ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	],
*/

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			//i用來決定要選哪個locations的陣列
			var ship = this.ships[i];
			//indexOf決定數值是否在陣列裡面, ex A6 , 在 ships[0] , locations[1]的位置， 所以會增加一個hit , 在 hits[1]
			var index = ship.locations.indexOf(guess);
			//console.log(index);
			//console.log(i);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			// 如果先前有打過這個船， 就是在ships 的hits陣列有 hit， 則出警告訊息
			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {  //如果上面的index有indexOf判定,數值出來，代表有找到船隻
				ship.hits[index] = "hit"; //在ship , hits陣列 加入 "hit"
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					//計算有幾個被擊毀
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  { //最上面定義shipLength: 3,
			if (ship.hits[i] !== "hit") {			 //如果ship , hits陣列不是hit，則return false
				return false;
			}
		}
	    return true;
	},

	generateShipLocations : function(){
		var locations;
		for (var i = 0; i < this.numShips; i++){  //建立三個numShips =3, 連續建立船隻 透過generateShip function
			do {
				locations = this.generateShip(); //定義locations 為 產生的 ship
			} while (this.collision(locations)); // 確定沒重疊的ships, 當回傳值為false時 會跳出迴圈
			this.ships[i].locations = locations; //定義陣列ships 裡的字典locations 為 前面定義的 locations 
		}

	},

	generateShip : function(){
		var direction = Math.floor(Math.random()*2); //故意用這個方式 隨機產生 0 或 1
		var row, col;

		if (direction === 1){
			row = Math.floor(Math.random()* this.boardSize);
			col = Math.floor(Math.random()* (this.boardSize - this.shipLength)); //直放的船 可以有 0~6 的位置放 ，但是它的長度有三格 所以橫向只能有 0~4才夠放
		} else {
			row = Math.floor(Math.random()* (this.boardSize - this.shipLength)); //橫放的船 可以有 0~6 的位置放 ，但是它的長度有三格 所以直向只能有 0~4才夠放
			col = Math.floor(Math.random()* this.boardSize);
		}

		var newShipLocations = [];
		for (var i=0; i< this.shipLength; i++){ //shipLength: 3,船的長度
			if (direction === 1) {
				newShipLocations.push(row + "" + (col+i)); //把row and col加到陣列， col +i , 因為 i 為 0 ，1 ，2 即為它的橫向為 3的長度 ex row = 0, col =4 , 04 05 06
			}else{
				newShipLocations.push((row+i) + "" + col); //把row and col加到陣列， row +i , 因為 i 為 0 ，1 ，2 即為它的直向為 3的長度 ex row = 0, col =4 , 04 14 24
			}
		}

		return newShipLocations;

	},

	collision:function(locations){//line 67 ,定義的locations = this.generateShip()
		for (var i =0 ; i < this.numShips; i++){
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++){ //line 67 ,定義的locations = this.generateShip()
				//console.log(locations.length);
				if (ship.locations.indexOf(locations[j]) >= 0){
					console.log(ship.locations.indexOf(locations[j]));
					return true;
				}
				
			}
		}
		return false;
	}



	
}; 

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss:function(location){
		var cell = document.getElementById(location);
		cell.setAttribute ("class", "miss");

	}
};

//如果輸入的數值是null 或是 長度不是二的話則彈出警告視窗

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		//選取第一個字元
		var firstChar = guess.charAt(0);
		//過濾第一個字元在 alphabet陣列的哪個位置
		var row = alphabet.indexOf(firstChar);
		//選取第二個字元
		var column = guess.charAt(1);
		console.log(row);
		console.log(column);
		//如果row or column 不是數字的話 則 ....最上面定義boardSize: 7
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

var controller = {
	guesses : 0,

	processGuess : function(guess){
		var location = parseGuess(guess); //定義位置， 從parseGuess判別位置
		if (location){					  //如果得到位置的話
			this.guesses++;				  //guesses = gessess +1
			var hit = model.fire(location); //hit 等於model裡的攻擊的位置 ， 最上面定義shipsSunk: 0, numShips: 3,
			if (hit && model.shipsSunk === model.numShips){ // && = AND
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guessess");
			}

		}
	}
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

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


// init - called when the page has completed loading

window.onload = init;

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	model.generateShipLocations();
}


//controller.processGuess("A6");
//controller.processGuess("B6");
//controller.processGuess("C6");

//controller.processGuess("D4");
//controller.processGuess("E4");
//controller.processGuess("C4");

//controller.processGuess("B0");
//controller.processGuess("B1");
//controller.processGuess("B2");
//console.log (model.generateShip)

