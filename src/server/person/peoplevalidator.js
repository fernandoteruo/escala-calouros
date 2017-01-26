/**
 * Check if all people are correct, i.e no repetition unless have enough shifts overall
 * @param  {Object[]} people Array of people
 * @param  {number} shift  The shift to check
 * @param  {number} sheetId  The ss id
 * @return {number}        All erros found
 */
function checkPeople_(people, shiftNum, sheetId) {
	var errors = 0;
	var msgs = "";
	var i, person, msg;
	for (i = 0; i < people.length; i++) {
		person = people[i];
		if (person.shift != "XXX" && searchTimesDeparment_(person, person.shift) > 1 && searchTotalShifts_(person) < 10) {
			errors++;
			msg = "O calouro " + person.name + " já passou no depto " + person.shift + " - verifique o erro nas colunas 'T' a 'AD' da aba 'EscalaTurnos' e ajuste manualmente\n";
			msgs += msg;
			setLogErr_(msg);
		}
		if (person.shift != "XXX" && searcPreviousShift_(person, shiftNum, sheetId) == person.shift) {
			errors++;
			msg = "O calouro " + person.name + " passou no depto " + person.shift + " da última vez Evite repetir turnos em dias consecutivos\n";
			msgs += msg;
			setLogErr_(msg);
		}
	}
	return {qtd: errors, msgs: msgs};
}

/**
 * Check if person already did a deparment
 * @param  {Object} person     A person
 * @param  {Object} department A deparment
 * @return {boolean}            true if already did a deparment
 */
function checkAlready_(person, department) {
	var times = 0;
	switch (department.name) {
		case 'CME':
			times = person.cme;
			break;
		case 'ENF':
			times = person.enf;
			break;
		case 'NUT':
			times = person.nut;
			break;
		case 'OD':
			times = person.od;
			break;
		case 'PF':
			times = person.pf;
			break;
		case 'PM':
			times = person.pm;
			break;
		case 'PT':
			times = person.pt;
			break;
		case 'POD':
			times = person.pod;
			break;
		case 'SEC':
			times = person.sec;
			break;
		case 'TC':
			times = person.tc;
			break;
	}
	if (times !== 0) {
		if (searchTotalShifts_(person) <= 9 || times >= 2) {
			return true;
		}
		return false;
	}
	return false;
}