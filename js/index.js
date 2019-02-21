var player1 = [];
var player2 = [];

var winTerms = [];
var turnsCount = 0;

var game = document.getElementById("step2");
var trows = game.getElementsByTagName("tr");
var tdatas = null;

var firstPlayer = null;
var gameDone = false;

getActivePlayer();

var tab_first = document.getElementById("step1");

// Set Game size
function setGame(n) {
	gameDone = false;
	tab_first.classList.remove("open");
	tab_first.classList.add("close");


	document.getElementById("step2").style.display = "block";
	document.getElementById("result").style.display = "block";
	setWinTerms(n);
	var board = document.getElementById("board");
	// var aTable = document.createElement("table");
	// var aTr = document.createElement("tr");
	// var aTd = document.createElement("td");
	// var aTdNode = document.createTextNode("1");
	var node = 0;
	for(var i=0; i<n; i++) {
		var row = board.insertRow(i);
		for(var j=0; j<n; j++) {
			
			// console.log(j);
			node++;
			row.insertCell(j).innerHTML = node;
		}
	}

	for(var i = 0; i < trows.length; i++) {
		tdatas = trows[i].getElementsByTagName("td");

		for(var n = 0; n < trows.length; n++) {
			document.getElementsByTagName("td")[i].style.width =  300/trows.length + "px";
			tdatas[n].onclick = function(res) {
				// player1.push(res.target.innerHTML);
				if(gameDone) {

				} else {
					addInput(parseInt(res.target.innerHTML));
					this.onclick = null;

						if(firstPlayer) {
							this.style.color = "rgb(247,198,199)";
							this.innerHTML = "X";
							
						} else {
							this.style.color = "rgb(181,215,199)";
							this.innerHTML = "O";
						}
					
					this.style.cursor = "not-allowed";
					checkResult(n);
					firstPlayer = !firstPlayer;
					if(firstPlayer) {
						document.getElementById("p1").style.backgroundColor = "rgb(247,198,199)";
						document.getElementById("p2").style.backgroundColor = "white";
						document.getElementById("p1").style.opacity = "1";
						document.getElementById("p2").style.opacity = "0.4";
					} else {
						document.getElementById("p1").style.backgroundColor = "white";
						document.getElementById("p2").style.backgroundColor = "rgb(181,215,199)";
						document.getElementById("p1").style.opacity = "0.4";
						document.getElementById("p2").style.opacity = "1";
					}
				}
				
			}
		}
	}

}

// End of Game size

if(firstPlayer) {
	document.getElementById("p1").style.backgroundColor = "rgb(247,198,199)";
	document.getElementById("p1").style.opacity = "1";
} else {
	document.getElementById("p2").style.backgroundColor = "rgb(181,215,199)";
	document.getElementById("p2").style.opacity = "1";
}


function setWinTerms(n) {
	winTerms = [];
	for(var i=1; i<=n; i++) {

		if(n > 4) {
			if(i+4 < n+1) {
				// l to r
				for(var j=0; j<n; j++) {
					winTerms.push([i+(n*j), i+(n*j)+1, i+(n*j)+2, i+(n*j)+3]);
					winTerms.push([i+(n*j)+1, i+(n*j)+2, i+(n*j)+3, i+(n*j)+4]);
				}
				// 1 to b
				winTerms.push([i, i+n, i+(n*2), i+(n*3)]);
				winTerms.push([i+n, i+(n*2), i+(n*3), i+(n*4)]);

				// 1 to rb
				winTerms.push([i, i+n+1, i+(n+1)*2, i+(n+1)*3]);
				winTerms.push([i+n+1, i+(n+1)*2, i+(n+1)*3, i+(n+1)*4]);
				winTerms.push([i+n, (i+n)*2, (i+n)*3, (i+n)*4]);
			} else if(i+3 < n+1) {
				// 2 to b, rb
				winTerms.push([i, i+n, i+2*n, i+3*n]);
				winTerms.push([i+n, i+2*n, i+3*n, i+4*n]);

				winTerms.push([i, i+n+1, i+(n+1)*2, i+(n+1)*3]);
				winTerms.push([i+n, i+(n*2)+1, i+(n*3)+2, i+(n*4)+3]);
			} else if(i+2 < n+1) {
				// 3 to b
				winTerms.push([i, i+n, i+2*n, i+3*n]);
				winTerms.push([i+n, i+2*n, i+3*n, i+4*n]);
			} else if(i+1 < n+1) {
				// 4 to lb, b
				winTerms.push([i, i+n-1, i+(n-1)*2, i+(n-1)*3]);
				winTerms.push([i+n, i+(n*2)-1, i+(n*3)-2, i+(n*4)-3]);

				winTerms.push([i, i+n, i+2*n, i+3*n]);
				winTerms.push([i+n, i+2*n, i+3*n, i+4*n]);
			} else if(i < n+1) {
				// 5 to lb, b
				winTerms.push([i, i+n-1, i+(n-1)*2, i+(n-1)*3]);
				winTerms.push([i+n-1, i+(n-1)*2, i+(n-1)*3, i+(n-1)*4]);

				winTerms.push([i+n, i+(n*2)-1, i+(n*3)-2, i+(n*4)-3]);

				winTerms.push([i, i+n, i+2*n, i+3*n]);
				winTerms.push([i+n, i+2*n, i+3*n, i+4*n]);
			}
		} else {
		
			if(i+2 < n+1) {
				// l to r
				for(var j=0; j<n; j++) {
					winTerms.push([i+(n*j), i+(n*j)+1, i+(n*j)+2]);
				}
				winTerms.push([i, i+n, i+(n*2)]);
				winTerms.push([i, i+n+1, i+(n+1)*2]);
			} else if(i+1 < n+1) {
				// r b
				winTerms.push([i, i+n, i+2*n]);
			} else if(i < n+1) {
				// t b
				winTerms.push([i, i+n, i+2*n]);
				winTerms.push([i, i+n-1, i+(n-1)*2]);
			}

		}
	}
}

function getActivePlayer() {
	if(Math.random() > 0.5) {
		firstPlayer = true;
	} else {
		firstPlayer = false;
	}
}
function addInput(data) {
	if(firstPlayer) {
		player1.push(data);
	} else {
		player2.push(data);
	}
	turnsCount++;
}
function checkResult(size) {
	var p1 = player1.sort();
	var p2 = player2.sort();
	
	if(turnsCount > 4) {
		var resultObject1 = search(p1, winTerms, size);
		var resultObject2 = search(p2, winTerms, size);
		if(firstPlayer) {
			if(resultObject1) {
				document.getElementById("result").innerHTML = "player1 WIN!";
				stopGame();
				document.getElementById("restart").style.display = "block";
			} else if(!resultObject1 && turnsCount > ((size * size)-1)) {
				document.getElementById("result").innerHTML = "DRAW!";
				document.getElementById("restart").style.display = "block";
			}
		} else {
			if(resultObject2) {
				document.getElementById("result").innerHTML = "player2 WIN!";
				stopGame();
				document.getElementById("restart").style.display = "block";
			} else if(!resultObject2 && turnsCount > ((size * size)-1)) {
				document.getElementById("result").innerHTML = "DRAW!";
				document.getElementById("restart").style.display = "block";
			}
		}
	}
}

function search(nameKey, myArray, size){
    for (var i=0; i < myArray.length; i++) {

    	// Match Player Input with Combos
    	if(size < 4) {
    		if((nameKey).includes(myArray[i][0]) && 
	    	   (nameKey).includes(myArray[i][1]) && 
	    	   (nameKey).includes(myArray[i][2]) ) {
				return true;
			}
    	} else if (size > 4) {
    		if((nameKey).includes(myArray[i][0]) && 
	    	   (nameKey).includes(myArray[i][1]) && 
	    	   (nameKey).includes(myArray[i][2]) && 
	    	   (nameKey).includes(myArray[i][3]) ) {
				return true;
			}
    	}

    }
}

function stopGame() {
	document.getElementsByClassName("box").onclick = null;
	gameDone = true;
}

function resetGame() {
	var myNode = document.getElementById("board");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
	document.getElementById("step2").style.display = "none";
	document.getElementById("result").style.display = "none";
	document.getElementById("result").innerHTML = "";
	tab_first.classList.remove("close");
	tab_first.classList.add("open");

	player1 = [];
	player2 = [];
	turnsCount = 0;
	document.getElementById("restart").style.display = "none";
}