/**
 * Calc depts for people
 * @param  {Object[]} people Array of people
 * @param  {Object[]} depts  Array of deparments
 * @return {Object[]}        return update people with calc'd deparment
 */
function peopleGeneralCalc_(people, depts) {
	var available = deptsAvailable_(people, depts);
	shuffle_(available);
	people = generalCalc_(people, depts, available);
	return people;
}

/**
 * Assignt deparment for person
 * @param  {Object[]} people         Array of people
 * @param  {Object[]} depts          Array of departments
 * @param  {Object[]} deptsAvailable Array of departments available
 * @return {Object[]}                Array of people edited
 */
function generalCalc_(people, depts, deptsAvailable) {
	var i;
	var j;
	//Firstly, check the minimum
	for (i = 0; i < people.length; i++) {
		if (people[i].shift == "SD") {
			loopDeptsMin: 
			for (j = 0; j < deptsAvailable.length; j++) {
				if (people[i].areaOD && deptsAvailable[j].name == "OD" || people[i].areaENF && deptsAvailable[j].name == "ENF") {
					continue loopDeptsMin;
				}
				if (!checkAlready_(people[i], deptsAvailable[j])) {
					if (people[i].gender == "H" && deptsAvailable[j].presentMen < deptsAvailable[j].minMen || people[i].gender == "M" && deptsAvailable[j].presentWomen < deptsAvailable[j].MinWomen || deptsAvailable[j].presentAll < deptsAvailable[j].minAll) {
						people[i].shift = deptsAvailable[j].name;
						deptsAvailable.splice(j, 1);
						break loopDeptsMin;
					}
				}
			}
		}
		updateOneDepartment_(depts, people[i]);
	}
	updateAllDepartments_(depts, people);
	//Then consider the ones that have the least
	for (i = 0; i < people.length; i++) {
		if (people[i].shift == "SD") {
			loopDeptsLess: 
			for (j = 0; j < deptsAvailable.length; j++) {
				if (people[i].areaOD && deptsAvailable[j].name == "OD" || people[i].areaENF && deptsAvailable[j].name == "ENF") {
					continue loopDeptsLess;
				}
				if (!checkAlready_(people[i], deptsAvailable[j])) {
					if (people[i].gender == "H" && deptsAvailable[j].presentMen == searchLessMore_(depts).lessMen || people[i].gender == "M" && deptsAvailable[j].presentWomen == searchLessMore_(depts).lessWomen || deptsAvailable[j].presentAll == searchLessMore_(depts).lessAll) {
						people[i].shift = deptsAvailable[j].name;
						deptsAvailable.splice(j, 1);
						break loopDeptsLess;
					}
				}
			}
		}
		updateOneDepartment_(depts, people[i]);
	}
	updateAllDepartments_(depts, people);
	return people;
}