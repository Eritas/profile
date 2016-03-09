//Object that shows results of player's move
console.log("here I am battleship");
var view = {
	//method that shows message about shoot's results
	displayMessage: function (msg) {
		//variable that get message area
		var messageArea = document.getElementById("messageArea");
		//Post message to message area
		messageArea.innerHTML = msg;
	},
	//Method that shows image on the field if player hit the ship
	displayHit: function (location) {
		//Get cell which player was shooting in
		var cell = document.getElementById(location);
		//assigned the class to this cell
		cell.setAttribute("class", "hit");
	},
	//Method that shows image on the field if player missed the ship
	displayMiss: function (location) {
		//Get cell which player was shooting in
		var cell = document.getElementById(location);
		//assigned the class to this cell
		cell.setAttribute("class", "miss");
	}
};

//Object that shows model of game
var model = {
	//Size of game field
	boardSize: 7,
	//Number of ships
	numShips: 3,
	//Ship length
	shipLength: 3,
	//Number of sunk ships
	shipsSunk: 0,
	//Array with coordinates and hits of ships
	ships: [{locations: ["0", "0", "0"], hits: ["", "", ""]},
			{locations: ["0", "0", "0"], hits: ["", "", ""]},
			{locations: ["0", "0", "0"], hits: ["", "", ""]}],
	//Method that shows player's guess
	fire: function(guess) {
		for(var i = 0; i < this.numShips; i++) {
			//Variable with coordinates of ship from ships array
			var ship = this.ships [i];
			//Variable index assigned index of location that player was shoot at
			var index = ship.locations.indexOf(guess);
			//If player hit the ship var index will be >= 0
			if (index >= 0) {
				//Hit will enroll in ships array
				ship.hits[index] = "hit";
				//Call method of object view that shows image of hit according to player's coordinates
				view.displayHit(guess);
				//Call method of object view that shows message
				view.displayMessage("HIT!");
				//If the hit sunk the ship
				if (this.isSunk(ship)) {
					//Call method of object view that shows message
					view.displayMessage("You sank my battleship!");
					//Increase number of sunk ships for 1
					this.shipsSunk++;
				}
				return true;
			}
		}
		//Call method of object view that shows image of miss according to player's coordinates
		view.displayMiss(guess);
		//Call method of object view that shows message
		view.displayMessage("You missed.");
		return false;
	},
	//Check is the ship sunk
	isSunk: function(ship) {
		for(var i =0; i < this.shipLength; i++) {
			//If there is not 3 hits in ships array, than return false
			if(ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},


	generateShipLocations: function () {
		//Variable with new ship's coordinates
		var locations;
		for(var i = 0; i < this.numShips; i++) {
			do {
				//Call of method generateShip
				locations = this.generateShip();
				//Do it while new ship's locations will not match current locations
			} while (this.collision(locations));
			//New coordinates assigned to ships array
			this.ships[i].locations = locations;
		}
	},

	//Method that generate ship's locations
	generateShip: function () {
		//Generate number from 0 to 1,9 and round it down
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			//Generate number - coordinate of row from 0 to 6,9 and round it down
			row = Math.floor(Math.random() * this.boardSize);
			// Generate number - coordinate of column from 0 till difference of quantity of gaming cells and ship's
			// length and round it down
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1 ));
			//If variable direction = 0
		} else {
			// Generate number - coordinate of row from 0 till difference of quantity of gaming cells and ship's
			// length and round it down
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			//Generate number - coordinate of column from 0 to 6,9 and round it down
			col = Math.floor(Math.random() * this.boardSize);
		}
		//Array with generated locations
		var newShipLocations = [];
		for(var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				//Add to newShipLocations array value of row and column as two-digit number
				//add i value to column
				newShipLocations.push(row + "" + (col +i));
			} else {
				//Add to newShipLocations array value of row and column as two-digit number
				//add i value to row
				newShipLocations.push((row + i) + "" + col);
			}
		}
		console.log(newShipLocations);
		//Return array newShipLocations
		return newShipLocations;
	},

	//prevention of ship's locations collision
	collision: function (locations) {
		for(var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for(var j = 0; j < locations.length; j++) {
				//If new coordinates match locations of existing ships, then return true
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};

//Object controller
var controller = {
	//Number of player's shoots
	guesses: 0,
	allShoots: [],
	//Method that process the results of player's mouse shoots
	mouseShoot: $( "td.canShoot" ).click(function() {
		var location = $(this).attr('id');
		var coordinates = controller.allShoots.indexOf(location);
		$(this).mouseover(function(){
			$(this).off("click");
			$(this).css("cursor", "not-allowed");
		});
		if (coordinates >= 0) {
			alert("Oops, you've already shoot here");
		} else {
			controller.allShoots.push(location);
			//Variable hit get information about hit or miss of shoot
			var hit = model.fire(location);
			//Quantity of guesses increase for 1
			controller.guesses++;
			//If the ship was hit and quantity of sunk ships match quantity of all ships
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + controller.guesses + " guesses");
				var allCells = $(".canShoot").css("cursor", "not-allowed");
				allCells.off("click");
				var guessInput = $("input#guessInput").attr("disabled", true);
				guessInput.attr("placeholder", "Disabled input here");
			}
		}

	}),

	//Method that process the results of player's shoots
	processGuess: function (guess) {
		//Get results of player's shoot after check
		var location = parseGuess(guess);
		//If player entered his guess in right form
		if (location) {
			//Quantity of guesses increase for 1
			this.guesses++;
			//Variable hit get information about hit or miss of shoot
			var hit = model.fire(location);
			//If the ship was hit and quantity of sunk ships match quantity of all ships
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
};

//validation of player's guess
function parseGuess(guess) {
	//Array with row coordinates
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert ("Oops, please enter a letter and a number on the board.");
	}else {
		//Get element from guess array with index 0 - letter
		var firstChar = guess.charAt(0).toUpperCase();

		//Variable row assigned index of guessed letter from array alphabet
		var row = alphabet.indexOf(firstChar);
		//Variable column assigned index of guessed number from array guess
		var column = guess.charAt(1);
		var coordinates = controller.allShoots.indexOf(row+column);
		//If row and column are not numbers
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that is not on the board.");
			//Value of row and column shouldn't be more or less then board size
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else if (coordinates >= 0) {
			alert("Oops, you've already shoot here");
		} else {
			//Add new coordinates to array with all shoots
			controller.allShoots.push(row + "" + column);
			//return row and column as two-digit number
			return row + column;
		}
	}
	return null;
}


function init() {
	//fire button assigned to variable fireButton
	var fireButton = document.getElementById("fireButton");
	//Method that call function handleFireButton if fire button was clicked
	fireButton.onclick = handleFireButton;
	//Variable assigned information about player's shoot
	var guessInput = document.getElementById("guessInput");
	//Method that call function handleFireButton if enter button was clicked
	guessInput.onkeypress = handleKeyPress;

	//Call method generateShipLocations
	model.generateShipLocations();
}

function handleKeyPress(e) {
	//fire button assigned to variable fireButton
	var fireButton = document.getElementById("fireButton");
	//If enter button was clicked
	if (e.keyCode === 13) {
		//Call method click that calls function handleFireButton
		fireButton.click();
		return false;
	}
}


function handleFireButton() {
	//Variable assigned information about player's shoot
	var guessInput = document.getElementById("guessInput");
	//Variable guess assigned value of guessInput
	var guess = guessInput.value;
	// Call method processGuess that process the results of player's shoots
	controller.processGuess(guess);
	//Value of variable guessInput will be clean
	guessInput.value = "";
}

//Function init will be call after all elements on page will be loaded
window.addEventListener("load", init);



