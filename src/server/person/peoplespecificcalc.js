/**
 * Realise calc of people who is from one specific area/field
 * @param  {Object[]} people Array of people
 * @param  {Object[]} deps   Array of departments
 */
function peopleSpecificCalc_(people, deps) {
	var person, i, j;

	for (i = 0; i < people.length; i++) {
		person = people[i];
		if (person.areaOD || person.areaENF) {
			if (person.shift == "SD") {
				person.shift = calcPerson_(person, deps);
			}
		}
		updateOneDepartment_(deps, person);
	}
	for (j = 0; j < people.length; j++) {
		person = people[j];
		if (person.shift == "M") {
			if (person.areaOD || person.areaENF) {
				if (person.areaENF && person.areaOD && checkOdStatus_(deps) && checkEnfStatus_(deps)) {
					person.shift = "SD";
				} else if (person.areaOD && checkOdStatus_(deps)) {
					person.shift = "SD";
				} else if (person.areaENF && !person.areaOD && checkEnfStatus_(deps)) {
					person.shift = "SD";
				}
			}
		}
		updateOneDepartment_(deps, person);
	}

	updateAllDepartments_(deps, people);
}

/**
 * Realise calc of a specific person
 * @param  {Object} person One person
 * @param  {Object[]} deps   Array of deparments
 * @return {string}        One deparment name
 */
function calcPerson_(person, deps) {
	var shift = "M";
	var i, indexEnf, indexOd;
	
	for (i = 0; i < deps.length; i++) {
		if (deps[i].name == "OD") {
			indexOd = i;
		}
		if (deps[i].name == "ENF") {
			indexEnf = i;
		}
	}

	if (person.areaENF && person.areaOD) {
		if (!checkAlready_(person, deps[indexEnf]) && deps[indexEnf].presentArea < deps[indexEnf].minArea) {
			shift = deps[indexEnf].name;
		}
		if (deps[indexOd].presentArea < deps[indexOd].minArea) {
			if (!checkAlready_(person, deps[indexOd])) {
				shift = deps[indexOd].name;
			} else {
				shift = "M";
			}
		}
	} else if (person.areaENF && !checkAlready_(person, deps[indexEnf]) && deps[indexEnf].presentArea < deps[indexEnf].minArea) {
		shift = deps[indexEnf].name;
	} else if (person.areaOD && !checkAlready_(person, deps[indexOd]) && deps[indexOd].presentArea < deps[indexOd].minArea) {
		shift = deps[indexOd].name;
	}
	return shift;
}