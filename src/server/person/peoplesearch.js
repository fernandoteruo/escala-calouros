/**
 * Check people who are avaivable
 * @param  {Object[]} people Array of people
 */
function calcPeopleAvailable_(people) {
	Logger.log("Verifica calouros que pegam turno");
	var i;
	var numPeopleAvailable = 0;
	for (i = 0; i < people.length; i++) {
		if (people[i].shift === "") {
			people[i].shift = "SD";
			numPeopleAvailable++;
		}
	}
	return {
		number: numPeopleAvailable,
		people: people
	};
}


/**
 * Search how many times a person did a deparment
 * @param  {Object} person     A person
 * @param  {Object} department A deparment
 * @return {number}            How many times person passed through a dept
 */
function searchTimesDeparment_(person, department) {
	switch (department) {
		case 'CME':
			return person.cme;
		case 'ENF':
			return person.enf;
		case 'NUT':
			return person.nut;
		case 'OD':
			return person.od;
		case 'PF':
			return person.pf;
		case 'PM':
			return person.pm;
		case 'POD':
			return person.pod;
		case 'PT':
			return person.pt;
		case 'SEC':
			return person.sec;
		case 'TC':
			return person.tc;
	}
}

/**
 * Search which was the previsous shift
 * @param  {Object} person A person
 * @param  {number} shift  The shift to calc
 * @return {string}        The deparment of previous shift
 */
function searcPreviousShift_(person, shift, sheetId) {
	var people;
	var i;

	if (shift > 1) {
		people = readPeople_(shift - 1, sheetId);
		for (i = 0; i < people.length; i++) {
			if (person.name == people[i].name) {
				return people[i].shift;
			}
		}
	}
}

/**
 * Total of shift that a person did
 * @param  {Object} person A person
 * @return {number}        Total of shifts done
 */
function searchTotalShifts_(person) {
	var previous = person.previousEvents[0] !== "" ? person.previousEvents[0] : 0;

	previous = person.previousEvents.length;
	return previous + person.cme + person.enf + person.nut + person.od + person.pf + person.pm + person.pod + person.pt + person.sec + person.tc;
}

/**
 * Check if there is someone with no department registered
 * @param  {Object[]} people Array of people
 * @return {number}        Number of people with no deparment
 */
function checkPeopleNoDept_(people) {
	var noDept = 0;
	var i;

	for (i = 0; i < people.length; i++) {
		if (people[i].shift == "SD") {
			noDept++;
		}
	}
	return noDept;
}