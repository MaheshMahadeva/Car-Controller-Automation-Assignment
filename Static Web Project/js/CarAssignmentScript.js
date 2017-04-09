/**
 * @file 
 * this file will hold functions for car transmission
 * @author  Mahesh M
 * @license  Mahesh
 */


/*
 *  Creating data members  and member functions for Car behaviour
 *  @param {String} initialFacing
 *  @param {number} currentRow
 *  @param {number} currentRow
 *  
*/
function Car(initialFacing, currentRow, currentCol) {
	var facingTowards;//a private variable to hold Car facing
	setFacingTowards();//changing private variable as per Car initial facing
	//setting member variables
	this.currentRow = currentRow;
	this.currentCol = currentCol;
	
	//Getter method to get current Car facing
	this.getFacingTowards = function() {
		if (facingTowards == 'N')
			return "North";
		else if (facingTowards == 'S')
			return "South";
		else if (facingTowards == 'E')
			return "East";
		else
			return "West";
	}
	//Method to set current Car facing
	function setFacingTowards() {
		switch (initialFacing.trim().toUpperCase()) {
		case "NORTH":
			facingTowards = 'N';
			break;
		case "SOUTH":
			facingTowards = 'S';
			break;
		case "EAST":
			facingTowards = 'E';
			break;
		case "WEST":
			facingTowards = 'W';
			break;
		default:
		}
	}

	//This method turns given Car towards left from current facing
	//During Car is turning, it wont be navigating from one Grid to another. Its takes a turn from current position
	this.turnLeft = function() {
		switch (facingTowards) {
		case 'N':
			facingTowards = 'W';
			break;
		case 'W':
			facingTowards = 'S';
			break;
		case 'S':
			facingTowards = 'E';
			break;
		case 'E':
			facingTowards = 'N';
			break;
		default:
			return false;
		}
		return true;
	}
	//This method turns given Car towards right from current facing
	//When Car is turned it wont be navigating from one Grid to another. Its takes a turn in current position
	this.turnRight = function() {

		switch (facingTowards) {
		case 'N':
			facingTowards = 'E';
			break;
		case 'W':
			facingTowards = 'N';
			break;
		case 'S':
			facingTowards = 'W';
			break;
		case 'E':
			facingTowards = 'S';
			break;
		default:
			return false;
		}
		return true;
	}
	//This method helps to move a Car forward 
	//Based on current Car facing, the Row or Column transmission will be decided
	this.moveForward = function() {

		switch (facingTowards) {
		case 'N':
			this.currentRow++;
			break;
		case 'W':
			this.currentCol--;
			break;
		case 'S':
			this.currentRow--;
			break;
		case 'E':
			this.currentCol++;
			break;
		default:
			return false;
		}
		return true;
	}
}

/*
 * This Method binds submit event to form after page DOM load
 */

$( document ).ready(function() {
	
	/*
	 * Form submit behaviour 
	 */
	$( "form#GetPositionForm" ).submit(function() {
		$(".msg").hide();//Hiding all the message currently displaying on page
	
		//Form validation statements with appropriate messages 
		if($("#row").val() == undefined || $("#row").val() == '' || $("#col").val() == undefined || $("#col").val() == ''){
			alert("Please enter Initial Position of Car in Grid");
			return false;
		}
		if($("#row").val() <=0 || $("#col").val() <= 0){
			alert("Please enter valid positive Initial Position of Car in Grid");
			return false;
		}
		if($("#row").val() > 15 || $("#col").val() > 15){
			alert("Initial Position values are out of grid. Please enter correct value");
			return false;
		}
		if($("#transmission").val() == undefined || $("#transmission").val() == ''){
			alert("Please input car transmission");
			return false;
		}
		$("img").remove();//removing Car direction images if any displayed on page.
	
		var c1 = new Car($("#initialFacing").val(), $("#row").val(), $("#col").val());//Creating Car Object with initial position, for Car model defined above
	
		var direction = $("#transmission").val().trim().toUpperCase();//getting transmission String from text field
		//Iterates transmission string and changes the behaviour of Car object 
		for (var i = 0; i < direction.length; i++) {
			if (direction.charAt(i) == 'R') {
				c1.turnRight();
			} else if (direction.charAt(i) == 'L') {
				c1.turnLeft();
			} else if (direction.charAt(i) == 'F') {
				c1.moveForward();
			}
		}
		//Validating Car current position and updating messages on web page
		if(c1.currentRow<= 15 && c1.currentCol<=15){
			//Updating column in table with Arrow to indicate Car position after transmission
			var td = $('#grid tr').eq(15-c1.currentRow+1).find('td').eq(c1.currentCol);
			var arrowSrc = "Arrow"+c1.getFacingTowards()+".png";
			//image insertion inside td
			td.html('<img src="images/'+arrowSrc+'" align="middle">');
			var msg = "Car is facing towards <b>"+c1.getFacingTowards()+"</b> at position <b>"+c1.currentRow+","+c1.currentCol+"</b>.";
			$("#isa_success").html(msg);//updating message on page
			$("#isa_success").show();//display message
			return false;
		}else{
			//If Car position is out of Grid 15 * 15 then error message will get displayed
			$("#isa_error").show();
			return false;
		}
		
	});
});
