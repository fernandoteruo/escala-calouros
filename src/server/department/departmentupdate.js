/**
 * Update all departments
 * @param  {Object[]} deps   Array of deparments
 * @param  {Objec[]} people Array of people
 */
function updateAllDepartments_(deps, people) {
	var i, j, k, person, deparment;

	for (k = 0; k < deps.length; k++) {
		deps[k].presentAll = 0;
		deps[k].presentArea = 0;
		deps[k].presentMen = 0;
		deps[k].presentWomen = 0;
	}
	for (i = 0; i < deps.length; i++) {
		for (j = 0; j < people.length; j++) {
			person = people[j];
			deparment = deps[i];
			if (deparment.name == person.shift) {
				deparment.presentAll++;
				if (person.gender == "H") {
					deparment.presentMen++;
				} else if (person.gender == "M") {
					deparment.presentWomen++;
				}
				if (person.areaOD && deparment.name == 'OD') {
					deparment.presentArea++;
				}
				if (person.areaENF && deparment.name == 'ENF') {
					deparment.presentArea++;
				}
			}
		}
	}
}

/**
 * Update one department according to the person
 * @param  {Object[]} deps   Array of deparments
 * @param  {Object} person A person who is responsible for the update
 */
function updateOneDepartment_(deps, person) {
	var i, deparment;

	for (i = 0; i < deps.length; i++) {
		deparment = deps[i];
		if (deparment.name == person.shift) {
			deparment.presentAll++;
			if (person.gender == "H") {
				deparment.presentMen++;
			} else if (person.gender == "M") {
				deparment.presentWomen++;
			}
			if (person.areaOD && deparment.name == 'OD') {
				deparment.presentArea++;
			}
			if (person.areaENF && deparment.name == 'ENF') {
				deparment.presentArea++;
			}
		}
	}
}