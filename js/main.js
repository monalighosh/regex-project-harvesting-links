var submitButt = document.getElementById("submit").addEventListener("click", harvestLinks);
var resultObj = {links:[], emailAddresses:[]};

function harvestLinks(e){
	e.preventDefault(); // Prevents form from submitting
	var val = document.getElementById("inputText").value; // Stores user input
	
	if(val == ""){ // Checks if the value is empty
		alert("The field cannot be empty!");
	} else if(val.length < 30){ // Checks if value is less than 30 characters
		alert("Minimum 30 characters required!");
	} else {
		// Regex pattern to match email ids
		var patternEmail = /mailto:[a-zA-Z0-9]+(?:[\.]?[\w!#$%^&*+-/=?`{|}~]*)@[a-zA-Z0-9]+(?:[a-zA-Z0-9-]*)\.[a-zA-Z]+(?:[.]?)(?:[a-zA-Z])*/g;
		// var patternEmail = /<a\s{1}href="mailto:[a-zA-Z0-9]+(?:[\.]?[\w!#$%^&*+-/=?`{|}~]*)@[a-zA-Z0-9]+(?:[a-zA-Z0-9-]*)\.[a-zA-Z]+(?:[.]?)(?:[a-zA-Z])*">/g;
		// Regex pattern to match email links
		var patternUrl = /<a\s{1}href="(http|https):\/{2}[a-zA-Z0-9]+-?\.[a-zA-Z]+(?:[.]?)(?:[a-zA-Z])">[\w]+(?:[\s\w!#$%^&*+-/=?`{|}~]*)<\/a>/g;

		var emails = val.match(patternEmail); // Searches the value for a match against the regex email pattern and stores all the matches in an array

		// Loops through the emails array and removes "mailto:" characters from each email id
		emails = emails.map(function(value){
			value = value.slice(7);
			resultObj["emailAddresses"].push(value);
		});

		var url = val.match(patternUrl); // Searches the value for a match against the regex link pattern and stores all the matches in an array
		var resultDiv = document.getElementById("result"); // Stores a div to show a list of harvested link
		resultDiv.style.display = "block"; // Modifies display property of a div to block
		var counter = 1;
		
		// Loops through the url array
		url = url.map(function(value){
			value = value.split("\""); // Splits a string value into an array of substrings
			value.shift(); // Removes the first item of an array
			value[1] = value[1].slice(1, -4); // Extracts parts of a second string item of an array
			var linkObj = {}; // Creates new object
			linkObj["linkText"] = value[1]; 
			linkObj["url"] = value[0];
			resultObj["links"].push(linkObj); // Adds new object to the links array
			var divPara = document.createElement("P"); // Creates new paragraph element under a div to display link details
			resultDiv.appendChild(divPara);
			divPara.innerHTML = ("Link" + counter + " Title: " + value[1] + ", URL: " + value[0] + "\n"); // Updates each paragraph element with the link details
			counter++;
		});
	}

	console.log(resultObj);
}


