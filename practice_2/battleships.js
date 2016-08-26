var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false){
	guess = prompt("準備，瞄準，射擊! (輸入0-6數值):");
	if (guess <0 || guess > 6){
		alert("Value 0-6");
	}
	else{
		guesses = guesses +1;

		if (guess == location1 || guess == location2 || guess == location3){
			alert("Hit !!!")
			hits = hits +1;
			if (hits == 3){
				isSunk = true;
				alert("You sank my Ship !!")
			}
		}
		else{
			alert("Miss !!")
		}
	}
}

var stats = "You guess " + guesses + " times !!!" +" Your shoot percentage is " + (3/guesses);
alert (stats);